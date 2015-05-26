'use strict';

angular.module('animations').directive('cubeDial', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			controller: cubeDialCtrl,
			link: function postLink(scope, element, attrs) {

				var body, dialWidth, dialHeight, stage, stageWidth, stageHeight, stageParent, isDevice, interactionUp, interactionDown, interactionOut, interactionOver, interactionMove;
				var numFaces, faceWidth, faceHeight, faceArray = [], pressedElement, currentFace, myDialDraggable, initialFace;
				var container = element.find('div');
				//container.addClass('container');

				var nullObject = angular.element('<div></div>');
				nullObject.addClass('null-object');

				var isDevice = (/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));
				var isAndroid = (/android/i.test(navigator.userAgent.toLowerCase()));

				if(isDevice) {

					interactionUp = "touchend";
					interactionDown = "touchstart";
					interactionOut = interactionUp;
					interactionOver = interactionDown;
					interactionMove = 'touchmove';

				} else {

					interactionUp = "mouseup";
					interactionDown = "mousedown";
					interactionOut = "mouseout";
					interactionOver = "mouseover";
					interactionMove = 'mousemove';

				};

				var dial;

				numFaces = 6;
				initialFace = 0;
				var fullRotation = 360;
				var rotationStep = fullRotation/numFaces;
				faceWidth = 600;
				faceHeight = 350;
				dialWidth = 300;
				dialHeight = 300;
				var faceZOrigin = getZOrigin();
				var dynamicPerspective = getPerspective();



				function init (){
					TweenMax.set(container, {
						width:'100%',
						height:'auto'
					});

					TweenMax.set(nullObject, {
						position:'absolute',
						x:0
					})

					container.append(nullObject);
					createFaces();
					createDialGraphics();
					createDial();
					setCubeDraggable(initialFace);
					setDialDraggable();
					createPerspectiveSlider();
				}

				function createDialGraphics(){
					var dialGraphic = angular.element('<div></div>');
					dialGraphic.addClass('dial-graphic');
					TweenMax.set(dialGraphic, {
						position:'absolute',
						left:'50%',
						top:'41%',
						xPercent:-50,
						width:dialWidth,
						height:dialHeight,
						overflow:'hidden',
						backgroundImage:'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/greenDial.png)',
						zIndex:1999
					});
					container.append(dialGraphic);
				}

				function createDial(){
					dial = angular.element('<div></div>');
					dial.addClass('dial');
					TweenMax.set(dial, {
						position:'absolute',
						left:'50%',
						top:'41%',
						xPercent:-50,
						width:dialWidth,
						height:dialHeight,
						backgroundColor:'rgba(0,0,0,0)',
						zIndex:2000,
						z:-0
					});

					var dialNumContainer, dialNum;

					for(var i = 0; i < numFaces; i++){

						dialNumContainer = angular.element('<div></div>');
						dialNum = angular.element('<div></div>');
						dialNum.addClass('dial-number');
						dialNum.html(i);
						TweenMax.set(dialNumContainer, {
							position:'absolute',
							x:(dialWidth/2) - (20/2),
							y:30,

							width:20,
							height:20,
							rotation:rotationStep * i,
							textAlign:'center',
							transformOrigin:'50% 120px'
						});

						TweenMax.set(dialNum, {
							position:'absolute',
							width:20,
							height:20,
							fontSize:20,
							textAlign:'center',
							color:'white',
							fontFamily:'Arial, Helvetica, sans-serif',
						});
						dialNum.initRotation = rotationStep * i;
						dialNumContainer.append(dialNum);
						dial.append(dialNumContainer);


					}
					element.append(dial);
					setNumberRotation();
				}

				function createFaces(){

					var face, faceText;

					for(var i = 0 ; i <numFaces; i++){

						face = document.createElement('div');
						faceText = document.createElement('h1');
						face.className = 'face';
						TweenMax.set(face, {
							//x:stageWidth/2 - (faceWidth/2),
							left:'50%',
							top:'40%',
							//y:50,
							xPercent:-50,
							yPercent:-70,
							position:'absolute',
							width:faceWidth,
							height:faceHeight,
							overflow:'hidden',
							zIndex:-i,			transformPerspective:dynamicPerspective,
							transformOrigin:'50% 50% ' + -faceZOrigin + 'px',
							backgroundImage:'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/greenBox.png)',
							rotationY:i * rotationStep,
							z:-0,
							color:'white'

						});

						face.initRotationX = 0;
						face.initRotationY = i * rotationStep;

						faceArray.push(face);

						face.appendChild(faceText)
						container.append(face);
						$(".face h1").eq(0).addClass('cubeTextTitle').text("Swipe Me")
					}

				}

				function setDialDraggable(){
					myDialDraggable = Draggable.create(dial, {
						type:'rotation',
						dragResistance:0.4,
						maxDuration:1,
						throwResistance:0,
						throwProps:true,
						onDrag:onDialDrag,
						onPress:setPressed,
						onThrowUpdate:onDialDrag,
						onThrowComplete:onThrowComplete,
						ease:Back.easeOut.config(0.3),
						snap:function(endValue){
							return Math.round(endValue/rotationStep) * rotationStep;
						}
					})
				}

				function setCubeDraggable(id){

					var myCubeDraggable = null;

					myCubeDraggable = Draggable.create(nullObject, {
						type:'x, y',
						lockAxis:true,
						//trigger:faceArray[id],
						trigger:container,
						dragResistance:0.97,
						throwResistance:1000,
						maxDuration:1,
						throwProps:true,
						onDrag:onCubeDrag,
						onPress:setPressed,
						zIndexBoost:false,
						//onDragEnd:onCubeDragEnd,
						onThrowUpdate:onCubeDrag,
						onThrowComplete:onThrowComplete,
						ease:Back.easeOut.config(0.3),
						snap:{
							x:function(endValue) { return Math.round(endValue/rotationStep) * rotationStep; }
						}

					})
				}

				function onDialDragEnd(){


					//in order to determine which item is at the front we calculate that based on the container's current rotationY divided by the rotationStep
					var itemId = -Math.round(nullObject._gsTransform.x / rotationStep);

					var dir = (itemId < 0) ? -1 : 1;

					//if we've spun it in a negative rotationY (like -213) then normalise it up to a positive value
					itemId = (itemId < 0) ? (itemId%numFaces) + numFaces : itemId;
					//if we've spun it and it lands at a value like 356 the itemId would be rounded up to 6 (but the pageContainerArray only contains items from 0-5)
					//so we normalise it down
					itemId = (itemId > (numFaces-1)) ? itemId%numFaces : itemId;


					TweenMax.to(nullObject, 1, {
						x:(dir == -1) ? fullRotation - (itemId * rotationStep) : (-itemId * rotationStep),
						onUpdate:onCubeDrag,
						onComplete:onThrowComplete
					})



				}

				function setPressed(){

					pressedElement = this.target;
				}


				function onDialDrag(){

					$(dial)[0]._gsTransform.rotation = $(dial)[0]._gsTransform.rotation % fullRotation;
					TweenMax.set(nullObject, {
						x:$(dial)[0]._gsTransform.rotation,
						onUpdate:onCubeDrag
					});
					setNumberRotation();
				}

				function onCubeDrag(){

					var i = -1, destX, pagePos, destAlpha, destZIndex;

					destX = $(nullObject)[0]._gsTransform.x % fullRotation;

					while(++i < numFaces){

						pagePos = (faceArray[i].initRotationY + $(nullObject)[0]._gsTransform.x)/180;
						if(pagePos > 1){

							pagePos = 2 - pagePos;
						}
						//if it's  < 0 start sending the value back up again 1, 0.9, 0.8, 0.7....0, 0.1, 0.2, 0.3, 0.4
						if(pagePos < 0){

							pagePos = -pagePos;
						};

						destAlpha = 1 - pagePos;

						if(destAlpha < 0){
							destAlpha = -destAlpha
						};

						if(destAlpha > 1 ){

							destAlpha = 2 - destAlpha;
						};
						destZIndex = Math.round(destAlpha * fullRotation);

						TweenMax.set(faceArray[i], {

							rotationY:faceArray[i].initRotationY + destX,
							ease:Power1.easeOut,
							zIndex:destZIndex,
							alpha:destAlpha,
							force3D:true,
						})
					};


					if(pressedElement.className !== 'dial'){

						TweenMax.set(dial, {
							rotation:destX,
							onUpdate:setNumberRotation
						})

					}

				}

				function createPerspectiveSlider(){

					var sliderHolder = document.createElement('div');
					var sliderLabel = document.createElement('p');
					sliderLabel.innerHTML = 'Drag to change perspective'

					TweenMax.set(sliderHolder, {
						position:'absolute',
						left:'50%',
						top: '18%',
						y:400,
						xPercent:-50,
						yPercent:-150,
						//x:300,
						//y:760,
						width:400,
						height:60,
						backgroundColor:'rgba(118,146,57, 1)',
						borderRadius:50
					})
					TweenMax.set(sliderLabel, {
						position:'absolute',
						x:0,
						y:0,
						width:400,
						height:20,
						textAlign:'center',
						fontSize:20,
						fontWeight:100,
						color:'white',
						fontFamily:'Arial, Helvetica, sans-serif'
					})


					var sliderDragger = document.createElement('div');
					TweenMax.set(sliderDragger, {
						position:'absolute',
						x:10,
						y:10,
						width:40,
						height:40,
						backgroundColor:'rgba(56,56,57, 1)',
						borderRadius:'50%'//,
						//border:'1px solid #46474A'
					});

					sliderHolder.appendChild(sliderLabel)
					sliderHolder.appendChild(sliderDragger)
					container.append(sliderHolder);

					Draggable.create(sliderDragger, {
						type:'x',
						bounds:{minX:10, maxX:(400-10) - sliderDragger.clientWidth},
						onDrag:function(){
							var dragPercent = ((this.x - 10)/(340 )) * 100;

							TweenMax.to(faceArray, 1, {
								transformPerspective:(dragPercent !==0) ? dragPercent * dynamicPerspective : dynamicPerspective
							})


						}
					})

				}



				function onThrowComplete(){


					//in order to determine which item is at the front we calculate that based on the container's current rotationY divided by the rotationStep
					var itemId = -Math.round(nullObject._gsTransform.x / rotationStep);
					//if we've spun it in a negative rotationY (like -213) then normalise it up to a positive value
					itemId = (itemId < 0) ? (itemId%numFaces) + numFaces : itemId;
					//if we've spun it and it lands at a value like 356 the itemId would be rounded up to 6 (but the pageContainerArray only contains items from 0-5)
					//so we normalise it down
					itemId = (itemId > (numFaces-1)) ? itemId%numFaces : itemId;

					currentFace = faceArray[itemId];


					var posX = Math.round(Math.abs(nullObject._gsTransform.x));

					if( posX >= fullRotation){
						TweenMax.set(nullObject, {
							x:fullRotation -(itemId * rotationStep),
							onUpdate:onCubeDrag
						});


					}

					//setCubeDraggable(itemId);



				}




				function getZOrigin (){

					var faceZOrigin = Math.round((faceWidth/2) / Math.tan(DegreesToRadians((rotationStep/2))));
					//sideC = sideA / Math.sin(DegreesToRadians(angleA))

					return faceZOrigin;

				}

				function RadiansToDegrees(valRad){
					return (fullRotation/(2*Math.PI)*valRad)
				}
				function DegreesToRadians(valDeg){
					return ((2*Math.PI)/fullRotation*valDeg)
				}

				function getPerspective(){

					//calculation for the perspective if none is supplied
					return (rotationStep/fullRotation) * 2500;
				}
				function toInt(str){

					//convery 213px to 213
					return parseInt(str, 10);
				}

				function setNumberRotation(){
					var dialCopy = $(dial)[0];
					var i = document.getElementsByClassName('dial-number').length, currNum;
					while(--i > -1){
						currNum = document.getElementsByClassName('dial-number')[i];
						TweenMax.set(currNum, {
							rotation:-dialCopy._gsTransform.rotation - currNum.initRotation
						})
					}
				}

				init();
			}
		}

		function cubeDialCtrl(){



		}
	}
]);