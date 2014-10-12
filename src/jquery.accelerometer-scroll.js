;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "accelerometerScroll",
        defaults = {
        tiltBackStart: 35,
        tiltForwardStart: 60,
        tiltDifferential: 15,
        startAngle: 45
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = "accelerometerScroll";
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            var startPositionChecked = false,
                tiltForwardStart = this.settings.tiltForwardStart,
                tiltBackStart = this.settings.tiltBackStart,
                scrollPosition = document.body.scrollTop,
                scrollIncrement = 5,
                startScrollIncrement = 5;


            window.addEventListener("deviceorientation", function(eventData) {
                // we should normalise for orientation here

                if (!startPositionChecked) {

                    // check start

                    startPositionChecked = true;
                }

                // gamma is the left-to-right tilt in degrees, where right is positive
                //var tiltLR = eventData.gamma;

                // beta is the front-to-back tilt in degrees, where front is positive
                var tiltFB = eventData.beta;

                // alpha is the compass direction the device is facing in degrees
                //var dir = eventData.alpha;


                if (tiltFB > tiltForwardStart) {
                    if (scrollPosition - scrollIncrement >= 0) {
                        scrollPosition -= scrollIncrement;
                        window.scrollTo(0, scrollPosition);
                    }

                } else if (tiltFB < tiltBackStart) {
                    if (scrollPosition + scrollIncrement <= document.height) {
                        scrollPosition += scrollIncrement;
                        window.scrollTo(0, scrollPosition);
                    }


                } else {
                    scrollIncrement = startScrollIncrement;
                }



                // normalise the movement for orientation
                //that.normaliseMovement(eventData);

                // apply movement properties
                //that.handleMovement(eventData);
            });
        },

        handleMovement: function () {
            // gamma is the left-to-right tilt in degrees, where right is positive
            //var tiltLR = eventData.gamma;

            // beta is the front-to-back tilt in degrees, where front is positive
            //var tiltFB = eventData.beta;

            // alpha is the compass direction the device is facing in degrees
            //var dir = eventData.alpha



            //console.log(eventData);
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });

        // chain jQuery functions
        return this;
    };

})( jQuery, window, document );
