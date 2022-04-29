import {Form, Row, Col, Button} from 'react-bootstrap';
import {useState} from 'react';

import {useDispatch} from 'react-redux';

export const PaymentInfo = ({history}) => {
    const [validated, setValidated] = useState(false);

    const dispatch = useDispatch();

    const initialData = {
        cartType: 'Master',
        number: '',
        expMonth: new Date().getMonth() + 1,
        expYear: new Date().getFullYear(),
        validationCode: ''
    };

    const [paymentInfo, setPaymentInfo] = useState(initialData);

    const savePaymentInfo = async () => {
        dispatch({type: 'savePaymentInfo', paymentInfo})
        history.push('/confirm-order');
    }

    const handleCancel = (event) => {
        history.push('/personal-info');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        if (form.checkValidity() === true) {
            savePaymentInfo().then(r => {
            });
        }

        setValidated(true);
    };

    const handleFieldChange = (event) => {
        setPaymentInfo({...paymentInfo, [event.target.name]: event.target.value});
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                {['Master', 'Visa'].map((cartType) => (
                    <div key={cartType} className="mb-3">
                        <Form.Check
                            inline
                            id={`inline-radio-${cartType}`}
                            checked={paymentInfo.cartType === cartType}
                            value={cartType}
                            label={cartType}
                            name="cartType"
                            type='radio'
                            onChange={handleFieldChange}
                        />
                    </div>
                ))}
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="txtName">
                    <Form.Label>Cart Number</Form.Label>
                    <Form.Control
                        required
                        placeholder="Cart Number"
                        value={paymentInfo.number}
                        type="text"
                        name="number"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="txtExpMonth">
                    <Form.Label>Date of Expiry (MM/YYYY)</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control
                                required
                                name="expMonth"
                                placeholder="00"
                                value={paymentInfo.expMonth}
                                type="number"
                                onChange={handleFieldChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                required
                                name="expYear"
                                placeholder="0000"
                                type="number"
                                value={paymentInfo.expYear}
                                onChange={handleFieldChange}
                            />
                        </Col>
                    </Row>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="txtPhone">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="validationCode"
                        value={paymentInfo.validationCode}
                        placeholder="CVV"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Col>
                    <Button type="button"
                            variant="secondary"
                            onClick={handleCancel}>Back</Button>
                </Col>
                <Col className="text-right">
                    <Button type="submit">Next</Button>

                </Col>
            </Row>
        </Form>
    )
}