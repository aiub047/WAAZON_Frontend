export class MessagingService {
    setup(dispatch) {
        this.dispatch = dispatch;
    }

    showAlert(options) {
        this.dispatch({type: 'showAlert', payload: options});
    }

    showSuccessMessage(msg) {
        this.showAlert({
            type: 'success',
            title: 'Successful',
            body: msg
        });
    }

    showErrorMessage(msg) {
        this.showAlert({
            type: 'error',
            title: 'Error',
            body: msg
        });
    }
}

const alertService = new MessagingService();

export default alertService;