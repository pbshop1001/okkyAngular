'use strict';

angular.module('size-util').directive('coverResize', ['$window',
    function($window) {
        return {
            restrict: 'A',
            scope:{
                targetElem: "=bindingFoo"
            },
            link: function postLink(scope, element, attrs) {
                //function targetElement() {
                //    console.log(scope.targetElem);
                //    return scope.targetElem;
                //}
                //var targetElem = scope.targetElem;


                var w = angular.element($window);
                w.on('reszie', function(){
                    console.log('resize');
                })
                //console.log(w);
                //scope.$watch(function () {
                //    return {
                //        'h': w.height(),
                //        'w': w.width()
                //    };
                //}, function (newValue, oldValue) {
                //    scope.windowHeight = newValue.h;
                //    scope.windowWidth = newValue.w;
                //
                //    scope.resizeWithOffset = function (offsetH) {
                //
                //        scope.$eval(attr.notifier);
                //
                //        return {
                //            'height': (newValue.h - offsetH) + 'px'
                //            //,'width': (newValue.w - 100) + 'px'
                //        };
                //    };
                //
                //}, true);
                console.log(element);
                element.on("resize", function () {
                    console.log("resized.- element On");
                });
                element.bind('resize', function () {
                    console.log('resize');
                    scope.$apply();
                });
                element.bind('click', function () {
                    console.log('resize');
                    scope.$apply();
                });
            }
        };
    }
])
    .directive('ngSize', ['$window', function($window) {
        return {
            scope: {
                size: '=ngSize'
            },
            link: function(scope, element, attrs) {
                var telem = angular.element(element);
                element.bind("resize",function(e){

                    console.log(" Window resized! ");
                    // Your relevant code here...

                })

                $('#calendar').bind('resize', function(){
                    console.log('resized');
                });

                //
                //$root.ngSizeDimensions  = (angular.isArray($root.ngSizeDimensions)) ? $root.ngSizeDimensions : [];
                //$root.ngSizeWatch       = (angular.isArray($root.ngSizeWatch)) ? $root.ngSizeWatch : [];
                //
                //var handler = function() {
                //    angular.forEach($root.ngSizeWatch, function(el, i) {
                //        console.log(el, i);
                //        // Dimensions Not Equal?
                //        if ($root.ngSizeDimensions[i][0] != el.offsetWidth || $root.ngSizeDimensions[i][1] != el.offsetHeight) {
                //            // Update Them
                //            $root.ngSizeDimensions[i] = [el.offsetWidth, el.offsetHeight];
                //            // Update Scope?
                //            $root.$broadcast('size::changed', i);
                //        }
                //    });
                //};
                //
                //// Add Element to Chain?
                //var exists = false;
                //angular.forEach($root.ngSizeWatch, function(el, i) { if (el === element[0]) exists = i });
                //
                //// Ok.
                //if (exists === false) {
                //    $root.ngSizeWatch.push(element[0]);
                //    $root.ngSizeDimensions.push([element[0].offsetWidth, element[0].offsetHeight]);
                //    exists = $root.ngSizeWatch.length-1;
                //}
                //
                //// Update Scope?
                //$scope.$on('size::changed', function(event, i) {
                //    // Relevant to the element attached to *this* directive
                //    if (i === exists) {
                //        $scope.size = {
                //            width: $root.ngSizeDimensions[i][0],
                //            height: $root.ngSizeDimensions[i][1]
                //        };
                //    }
                //});
                //
                //// Refresh: 100ms
                //if (!window.ngSizeHandler) window.ngSizeHandler = setInterval(handler, 100);
                //
                //// Window Resize?
                //// angular.element(window).on('resize', handler);

            }
        };
    }])
    .directive('testSize', yourDirectiveName);

    function yourDirectiveName($window) {

        var directive = {
            link: link,
            restrict: 'AE',
            scope: {
                data: '=',
                renderer: '='
            }
        };
        return directive;

        function link(scope, element, attributes) {

            var w = angular.element($window);

            // Created a function that can watch the
            // width of the window so we know when
            // boostrap divs will trigger resizing
            scope.getWindowWidth = function () {
                return w.width();
            }

            // Watch for the size of the window changing
            // then switch according to the bootstrap
            // boundaries listed below.
            scope.$watch(scope.getWindowWidth, function (newWidth, oldWidth) {
                if (newWidth != oldWidth) {

                    switch (true) {
                        // xs/ss boundary (My custom boundary)
                        case (newWidth < 600): // Resize every time
                        case (newWidth >= 600 && oldWidth < 600):
                        // ss/sm boundary
                        case (oldWidth >= 768 && newWidth < 768):
                        case (newWidth >= 768 && oldWidth < 768):
                        // sm/md boundary
                        case (oldWidth >= 992 && newWidth < 992):
                        case (newWidth >= 992 && oldWidth < 992):
                        // md/lg boundary
                        case (oldWidth >= 1200 && newWidth < 1200):
                        case (newWidth >= 1200 && oldWidth < 1200):
                            scope.renderChart(element[0], attributes.color);
                            break;
                        default:
                            break;
                    }
                }
            });

            // Capture the window event so we can capture
            // the bootstrap media query boundaries
            w.bind('resize', function () {
                scope.$apply();
            });

            // Watch for the data or chart type changing
            scope.$watchCollection('[data, renderer]', function (newValue, oldValue) {
                if (!newValue[0]) {
                    return;
                }

                scope.renderChart(element[0], attributes.color);
            });

            // Render the D3 chart through Rickshaw
            scope.renderChart = function (element, color) {
                element.innerHTML = '';

                var graph = new Rickshaw.Graph({
                    element: element,
                    series: [{data: scope.data, color: color}],
                    renderer: scope.renderer
                });

                graph.render();
            };
        }
    }
