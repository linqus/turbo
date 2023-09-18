import { Controller } from 'stimulus';
import { Modal } from 'bootstrap';
import * as Turbo from '@hotwired/turbo';

export default class extends Controller {
    static targets = ['modal'];
    modal = null;

    connect() {
        this.element.addEventListener('turbo:before-fetch-response',this.beforeFetchResponse);
    }

    async openModal(event) {
        this.modal = new Modal(this.modalTarget);
        this.modal.show();
    }

    beforeFetchResponse(event) {
        if (!this.modal || !this.modal._isShown) {
            return;
        }

        const fetchResponse = event.detail.fetchResponse;

        if (fetchResponse.succeeded && fetchResponse.redirected) {
            event.preventDefault();
            Turbo.visit(fetchResponse.location);
        }
    }

}
