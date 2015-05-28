'use strict';

angular.module('animations').directive('meanAni', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

				var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x1099bb});
				var div = element.find('div');
				div.append(renderer.view);


				// create the root of the scene graph
				var stage = new PIXI.Container();
				var container = new PIXI.Container();


				stage.addChild(container);

				for (var j = 0; j < 5; j++) {
					for (var i = 0; i < 5; i++) {
						var bunny = PIXI.Sprite.fromImage('modules/animations/img/mean-ani/bunny.png');
						bunny.x = 40 * i;
						bunny.y = 40 * j;
						container.addChild(bunny);
					};
				};

				container.x = 100;
				container.y = 60;

				animate();

				function animate() {
					requestAnimationFrame(animate);

					// render the root container
					renderer.render(stage);
				}

				var canvas = element.find('canvas');
				canvas.css('width', '100%');
				canvas.css('float', 'left');
			}
		};
	}
]).directive('meanAni2', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

				var renderer = PIXI.autoDetectRenderer(800, 600);
				element.append(renderer.view);

				// create the root of the scene graph
				var stage = new PIXI.Container();

				PIXI.loader
					.add('modules/animations/img/mean-ani2/fighter.json')
					.load(onAssetsLoaded);

				var movie;

				function onAssetsLoaded()
				{
					// create an array of textures from an image path
					var frames = [];

					for (var i = 0; i < 30; i++) {
						var val = i < 10 ? '0' + i : i;

						// magically works since the spritesheet was loaded with the pixi loader
						frames.push(PIXI.Texture.fromFrame('rollSequence00' + val + '.png'));
					}


					// create a MovieClip (brings back memories from the days of Flash, right ?)
					movie = new PIXI.extras.MovieClip(frames);

					/*
					 * A MovieClip inherits all the properties of a PIXI sprite
					 * so you can change its position, its anchor, mask it, etc
					 */
					movie.position.set(300);

					movie.anchor.set(0.5);
					movie.animationSpeed = 0.5;

					movie.play();

					stage.addChild(movie);

					animate();
				}

				function animate() {
					movie.rotation += 0.01;

					// render the stage container
					renderer.render(stage);

					requestAnimationFrame(animate);
				}

				var canvas = element.find('canvas');
				canvas.css('width', '100%');
				canvas.css('float', 'left');

			}
		};
	}
]).directive('meanAni3', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

				var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
				element.append(renderer.view);

				// create the root of the scene graph
				var stage = new PIXI.Container();

				var sprite = PIXI.Sprite.fromImage('modules/animations/img/mean-ani/bunny.png');

				sprite.position.set(230,264);
				sprite.interactive = true;
				sprite.on('mousedown', onDown);
				sprite.on('touchstart', onDown);

				stage.addChild(sprite);

				function onDown (eventData) {

					sprite.scale.x += 0.3;
					sprite.scale.y += 0.3;
				}
				// start animating
				animate();

				function animate() {

					requestAnimationFrame(animate);

					// render the root container
					renderer.render(stage);
				}

				var canvas = element.find('canvas');
				canvas.css('width', '100%');
				canvas.css('float', 'left');
			}
		};
	}
]).directive('meanAni4', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

				var renderer = PIXI.autoDetectRenderer(800, 600,{transparent: true});
				element.append(renderer.view);

				// create the root of the scene graph
				var stage = new PIXI.Container();

				var basicText = new PIXI.Text('Basic text in pixi');
				basicText.x = 30;
				basicText.y = 90;

				stage.addChild(basicText);

				var style = {
					font : '36px Arial bold italic',
					fill : '#F7EDCA',
					stroke : '#4a1850',
					strokeThickness : 5,
					dropShadow : true,
					dropShadowColor : '#000000',
					dropShadowAngle : Math.PI / 6,
					dropShadowDistance : 6,
					wordWrap : true,
					wordWrapWidth : 440
				};

				var richText = new PIXI.Text('Rich text with a lot of options and across multiple lines',style);
				richText.x = 30;
				richText.y = 180;

				stage.addChild(richText);

				// start animating
				animate();

				function animate() {

					requestAnimationFrame(animate);

					// render the root container
					renderer.render(stage);
				}

				var canvas = element.find('canvas');
				canvas.css('width', '100%');
				canvas.css('float', 'left');
			}
		};
	}
]);