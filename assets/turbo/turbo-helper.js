import { Modal } from 'bootstrap';



const TurboHelper = class {
    constructor() {

        document.addEventListener('turbo:before-cache',()=>{
            this.hideModal();
            this.closePopup();
        

        })

        document.addEventListener('turbo:before-render', () => {
            document.querySelector('#weatherwidget-io-js').remove();
        });
        
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
    
} 

export default new TurboHelper();