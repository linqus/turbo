import { Controller } from 'stimulus';
// import * as Turbo from '@hotwired/turbo';
import { visit } from '@hotwired/turbo'; // import only visit function

export default class extends Controller {
    count = 0;
    static targets = ['count'];

    increment() {
        this.count++;
        this.countTarget.innerText = this.count;

        if (this.count === 10) {
            // Turbo.visit('/you-won');
            visit('/you-won'); // use imported function only from turbo
        }
    }
}
