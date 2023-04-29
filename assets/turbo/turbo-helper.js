import { Modal } from 'bootstrap';



const TurboHelper = class {
    constructor() {

        document.addEventListener('turbo:before-cache',()=>{
            this.hideModal();
            this.closePopup();
        

        })

        document.addEventListener('turbo:render', () => {
            this.initializeWeatherWidget();
        });
        

        document.addEventListener('turbo:visit', () => {
            document.body.classList.add('turbo-loading');
        }); 

        document.addEventListener('turbo:before-render', (event) => {
            event.detail.newBody.classList.add('turbo-loading');
        })

        document.addEventListener('turbo:render', () => {
            requestAnimationFrame(()=>{
                document.body.classList.remove('turbo-loading');
            })
        })
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

    initializeWeatherWidget() {
        __weatherwidget_init();
    }
    
} 

export default new TurboHelper();