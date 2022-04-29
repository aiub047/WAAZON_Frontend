import {Modal, Button} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";

export const AlertDismissible = () => {

    const dispatch = useDispatch();
    const alerts = useSelector(state => state.alerts);

    const handleClose = (id) => {
        dispatch({type: 'closeAlert', payload: id});
    }

    return (
        <>
            {alerts.map(alertOpt => {
                const handleCloseFn = () => handleClose(alertOpt.id);
                let className = '';
                switch (alertOpt.type) {
                    case 'error':
                        className = 'text-danger';
                        break;
                    case 'success':
                        className = 'text-success';
                        break;
                    case 'info':
                        className = 'text-info';
                        break;
                    default:
                        className = 'text-info';
                }

                return (<Modal key={alertOpt.id} show={true} onHide={handleCloseFn} contentClassName={className}>
                    <Modal.Header closeButton>
                        <Modal.Title>{alertOpt.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{alertOpt.body}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseFn}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>)
            })}
        </>);
}