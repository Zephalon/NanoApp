import $ from 'jquery';
import NanoApp from './classes/nanoapp';
import NanoApp from './module';

/**
 * Application Class
 */
class Application extends NanoApp {
    /**
     * Constructor
     */
    constructor() {
        super('Application');

        // variables

        // fetch elements
        this.$el = {
            window: $(window),
            document: $(document),
            html: $('html'),
            body: $('body'),
            html_body: $('html, body')
        };

        // bind application events

        // add modules
        this.module = new Module(this);

        // all set up
        this.$el.body.addClass('ready');
        this.trigger('ready');
    }
}

var application = new Application();