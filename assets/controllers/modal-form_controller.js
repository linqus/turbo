import { Controller } from 'stimulus';
import { Modal } from 'bootstrap';

export default class extends Controller {
    static targets = ['modal'];
    modal = null;
    boundBeforeFetchResponse = null;


    async openModal(event) {
        this.modal = new Modal(this.modalTarget);
        this.modal.show();
    }



}
