/**
 * Nano Application
 * @desc Ultra lightweight, event driven application template
 */
class NanoApp {
    /**
     * Constructor
     */
    constructor(name = '', bindDefaultEvents = true) {
        // default variables
        this._name = name;
        this._listeners = [];
        this._event_timer = [];
        this.$el = {};

        // bind default window events
        if (bindDefaultEvents) {
            window.addEventListener('resize', () => this.trigger('resize', window.innerWidth, 100), true);
            window.addEventListener('scroll', () => this.trigger('scroll', window.scrollY), true);
            window.addEventListener('hashchange', () => this.trigger('scroll', window.location.hash), true);
        }

        this.log('nano', this._name + ' constructed');
    }

    /**
     * Log Events
     *
     * @param {string} position
     * @param {string} message
     */
    log(position, message) {
        console.log('[' + position + '] ' + message);
    };

    /**
     * Add New Event To Array
     * 
     * @param {string} event 
     * @param {function} callback 
     * @param {boolean} once 
     */
    addEvent(event, callback) {
        this._listeners.push({
            callback: callback,
            event: event
        });
    }

    /**
     * Return All Listener Functions
     */
    get listeners() {
        return this._listeners;
    }

    /**
     * Remove A Callback
     * 
     * @param {integer} index 
     */
    removeEvent(index) {
        this._listeners.splice(index, 1); // remove from listeners
    }

    /**
     * Add Event Listener
     *
     * @param {string|array} events
     * @param {function} callback
     */
    on(events = [], callback) {
        let _this = this;
        events = Array.isArray(events) ? events : [events]; // normalize

        if (typeof callback === 'function') {
            events.forEach(function (event, index, object) {
                _this.addEvent(event, callback);
            });
        }
    };

    /**
     * Remove Function From Listeners
     * Add events to unbind only specific listeners
     *
     * @param {boolean|function} callback
     * @param {boolean|string|array} events
     */
    off(callback = false, events = false) {
        let _this = this;

        this.listeners.forEach(function (listener, index, object) {
            if (callback === false || listener.callback === callback) {
                if (events) {
                    events = Array.isArray(events) ? events : [events]; // normalize
                    if (!events.includes(listener.event)) {
                        return false; // does not match the provided events
                    }
                }
                _this.removeEvent(index);
            }
        });
    };

    /**
     * Trigger An Event, Run All Listener Functions
     *
     * @param {string|array} events
     * @param {null|object} payload
     * @param {boolean|integer} throttle
     */
    trigger(events = [], payload = null, throttle = false) {
        let _this = this;
        events = Array.isArray(events) ? events : [events]; // normalize

        events.forEach(function (event, index, object) {
            // optional: event debounce
            let now = new Date().getTime();
            if (throttle && _this._event_timer[event] !== undefined && _this._event_timer[event] + throttle > now) {
                return false;
            }
            _this._event_timer[event] = now;

            _this.log('event', event);

            // fire all bound events
            _this.listeners.forEach(function (listener) {
                if (listener !== undefined && listener.event === event) {
                    listener.callback.call(_this, event, payload); // preserve 'app' context
                }
            });
        });
    };
};

export default NanoApp;