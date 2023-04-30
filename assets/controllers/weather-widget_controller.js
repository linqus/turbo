import { Controller } from '@hotwired/stimulus';
import TurboHelper from '../turbo/turbo-helper';

export default class extends Controller {

    connect() {
        TurboHelper.initializeWeatherWidget();
    }

}