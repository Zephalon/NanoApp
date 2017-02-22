(function ($) {
    /**
     * Application (Constructor)
     */
    var Application = function () {
        var _this = this;

        // vars
        var listeners = event_timer = []; // do not delete

        // elements
        var $el = {
            window: $(window),
            html: $('html'),
            body: $('body'),
            html_body: $('html, body')
        };

        /**
         * Initialize
         */
        var initialize = function () {
        };

        /**
         * Log Events
         *
         * @param {string} position
         * @param {string} message
         */
        var log = function (position, message) {
            console.log('[' + position + '] ' + message);
        };

        /**
         * Add Event Listener
         *
         * @param {undefined|string|array} events
         * @param {function} callback
         */
        this.on = function (events, callback) {
            if (typeof callback === 'function') {
                if (typeof events === 'string') {
                    events = [events];
                }

                if (events instanceof Array) {
                    // add listeners
                    for (var i = 0; i < events.length; i++) {
                        listeners.push({
                            callback: callback,
                            event: events[i]
                        });
                    }
                }
            }
        };

        /**
         * Remove Function From Listeners
         *
         * @param {function} callback
         * @param {undefined|string} event
         */
        this.off = function (callback, event) {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i] !== undefined && listeners[i].callback === callback) {
                    // check if listener contains event (optional)
                    if (typeof event === 'string' && listeners[i].event !== event) {
                        return false;
                    }
                    delete(listeners[i]);
                }
            }
        };

        /**
         * Trigger An Event, Run All Listener Functions
         *
         * @param {string} event
         * @param {undefined|object} payload
         * @param {undefined|integer} throttle
         */
        this.trigger = function (event, payload, throttle) {
            if (typeof event === 'string') {
                // event debounce
                var now = new Date().getTime();
                if (throttle !== undefined && throttle * 1 === parseInt(throttle, 10)) {
                    if (event_timer[event] !== undefined && event_timer[event] + throttle > now) {
                        return false;
                    }
                }
                event_timer[event] = now;

                log('event', event);

                // fire all bound events
                for (var i = 0; i < listeners.length; i++) {
                    if (listeners[i] !== undefined && listeners[i].event === event) {
                        listeners[i].callback(event, payload);
                    }
                }
            }
        };

        this.on('construct', initialize);
    };

    // create instance‚
    window.application = new Application();

    /**
     * Initialize
     */
    $(document).ready(function () {
        window.application.trigger('construct');
    });
})(jQuery);