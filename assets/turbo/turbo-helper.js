import { Modal } from 'bootstrap';



const TurboHelper = class {
    constructor() {

        document.addEventListener('turbo:before-cache',()=>{
            this.hideModal();
            this.closePopup();
        

        })

        document.addEventListener('turbo:submit-start', (event) => {
            console.log('submit start',event);
/*          
            event.detail.formSubmission.submitter.toggleAttribute('disabled', true);
            event.detail.formSubmission.submitter.classList.remove('btn-primary');
            event.detail.formSubmission.submitter.classList.add('btn-warning'); 
*/

        })
        
        document.addEventListener('turbo:before-fetch-response', (event) => {
            this.beforeFetchResponse(event);
        });

        document.addEventListener('turbo:before-fetch-request', (event) => {
            this.beforeFetchRequest(event);
        });


        this.initializeTransitions();
    }

    hideModal() {
        if (document.body.classList.contains('modal-open')) {
            const modalElement = document.querySelector('.modal.show');
            const modal = Modal.getInstance(modalElement);
            modalElement.classList.remove('fade');
            modal._backdrop._config.isAnimated = false;
            modal.hide();
            modal.dispose();
        }
    }    

    closePopup() {
        if (__webpack_modules__[require.resolveWeak('sweetalert2')]) {
            // because we know it's been imported, this will run synchronously
            import('sweetalert2').then((Swal) => {
                if (Swal.default.isVisible()) {
                    Swal.default.getPopup().style.animationDuration = '0ms'
                    Swal.default.close();
                }
            })
        }
    }



    isPreviewRendered() {
        return document.documentElement.hasAttribute('data-turbo-preview');
    }
    
    initializeTransitions() {
        document.addEventListener('turbo:visit', () => {
            // fade out the old body
            document.body.classList.add('turbo-loading');
        });
        document.addEventListener('turbo:before-render', (event) => {
            if (this.isPreviewRendered()) {
                // this is a preview that has been instantly swapped
                // remove .turbo-loading so the preview starts fully opaque
                event.detail.newBody.classList.remove('turbo-loading');
                // start fading out 1 frame later after opacity starts full
                requestAnimationFrame(() => {
                    document.body.classList.add('turbo-loading');
                });
            } else {
                const isRestoration = event.detail.newBody.classList.contains('turbo-loading');
                if (isRestoration) {
                    // this is a restoration (back button). Remove the class
                    // so it simply starts with full opacity
                    event.detail.newBody.classList.remove('turbo-loading');
                    return;
                }
                // when we are *about* to render a fresh page
                // we should already be faded out, so start us faded out
                event.detail.newBody.classList.add('turbo-loading');
            }
        });

        document.addEventListener('turbo:render', () => {
            if (!this.isPreviewRendered()) {
                // if this is a preview, then we do nothing: stay faded out
                // after rendering the REAL page, we first allow the .turbo-loading to
                // instantly start the page at lower opacity. THEN remove the class
                // one frame later, which allows the fade in
                requestAnimationFrame(() => {
                    document.body.classList.remove('turbo-loading');
                });
            }
        });
    }

    beforeFetchResponse(event) {

        const fetchResponse = event.detail.fetchResponse;

        const redirectLocation = fetchResponse.response.headers.get('Turbo-Location');
        if (!redirectLocation) {
            return;
        }

        event.preventDefault();
        Turbo.cache.clear();
        Turbo.visit(redirectLocation);
    }

    beforeFetchRequest(event) {

        const frameId = event.detail.fetchOptions.headers['Turbo-Frame'];
        if (!frameId) {
            return;
        }

        const frame = document.getElementById(frameId);

        if (!frame || !frame.dataset.turboFormRedirect) {
            return;
        }

        event.detail.fetchOptions.headers['Turbo-Form-Redirect'] = 1;
    }
} 

export default new TurboHelper();