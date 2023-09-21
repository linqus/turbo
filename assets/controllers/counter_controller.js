import { Controller } from 'stimulus';
// import * as Turbo from '@hotwired/turbo';
import { visit, renderStreamMessage } from '@hotwired/turbo'; // import only visit function

export default class extends Controller {
    count = 0;
    static targets = ['count'];

    increment() {
        this.count++;
        this.countTarget.innerText = this.count;

        const streamMessage = `
        <turbo-stream action="update" target="flash-container">
            <template>
                <div class="alert alert-success">
                    Thanks for clicking ${this.count} times!
                </div>
            </template>
        </turbo-stream>
        `; 

        renderStreamMessage(streamMessage);

        if (this.count === 10) {
            // Turbo.visit('/you-won');
            visit('/you-won'); // use imported function only from turbo
        }
    }
}
