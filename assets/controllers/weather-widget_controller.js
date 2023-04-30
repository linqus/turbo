import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

    connect() {

        if (typeof __weatherwidget_init === 'function') {
            __weatherwidget_init();
        } else {
            this.initialiseScript(document,'script', 'weatherwidget-io-js');
        };
    
    }

    initialiseScript(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = 'https://weatherwidget.io/js/widget.min.js'; fjs.parentNode.insertBefore(js, fjs); } };
    


}