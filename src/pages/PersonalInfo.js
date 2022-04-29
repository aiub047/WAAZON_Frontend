import {Form, Row, Col, Button} from 'react-bootstrap';
import {useState} from 'react';

import {useDispatch} from 'react-redux';

export const PersonalInfo = ({history}) => {
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();

    const person = {
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: ''
    };

    const [personalInfo, setPersonalInfo] = useState(person);

    const savePersonalInfo = async () => {
        dispatch({type: 'savePersonalInfo', personalInfo})
        history.push('/payment-info');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        if (form.checkValidity() === true) {
            savePersonalInfo().then(r => {
            });
        }

        setValidated(true);
    };

    const handleCancel = (event) => {
        history.push('/cart');
    }

    const handleFieldChange = (event) => {
        setPersonalInfo({...personalInfo, [event.target.name]: event.target.value});
    };


    return (
        <Form validated={validated} noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="txtName">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                        required
                        placeholder="name"
                        value={personalInfo.name}
                        type="text"
                        name="name"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="txtEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        name="email"
                        value={personalInfo.email}
                        placeholder="Email"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="txtPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="phone"
                        value={personalInfo.phone}
                        placeholder="Phone"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="txtStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        required
                        value={personalInfo.street}
                        name="street"
                        type="text"
                        placeholder="Street"
                        onChange={handleFieldChange}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a street.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="txtCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        value={personalInfo.city}
                        name="city"
                        type="text"
                        placeholder="City"
                        onChange={handleFieldChange}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a city.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="txtState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        required
                        value={personalInfo.state}
                        name="state"
                        type="text"
                        placeholder="State"
                        onChange={handleFieldChange}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a state.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="txtZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                        required
                        value={personalInfo.zip}
                        name="zip"
                        type="text"
                        placeholder="Zip"
                        onChange={handleFieldChange}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a Zip.
                    </Form.Control.Feedback>
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