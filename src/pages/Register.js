import {Form, Row, Col, Button} from 'react-bootstrap';
import {useState} from 'react';

import apiService from '../services/apiService';

export const Register = ({history}) => {
    const [validated, setValidated] = useState(false);

    const cleanUser = {
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "BUYER"
    };

    const [user, setUser] = useState(cleanUser);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        if (form.checkValidity() === true) {
            saveUser();
        }

        setValidated(true);
    };

    const saveUser = async () => {
        try {
            await apiService.post('auth/register', user, {successMessage: 'Successfully registered!'});
            history.push(`/signin`);
        } catch (error) {
            console.log(error);
        }
    }


    const handleFieldChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    };

    const handleRadioChange = (event) => {
        let role = 'BUYER';

        if (event.target.value === 'SELLER' && event.target.checked) {
            role = 'SELLER';
        }

        setUser({...user, role});
    };

    const handleCancel = () => {
        history.push('/shop');
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h2>Register</h2>
            <hr/>
            <Row className="mb-3">
                <Col>
                    <Form.Check
                        inline
                        id={`inline-radio-buyer`}
                        label="Buyer"
                        value="BUYER"
                        name="role"
                        type="radio"
                        checked={user.role === 'BUYER'}
                        onChange={handleRadioChange}
                    />
                    <Form.Check
                        inline
                        id={`inline-radio-seller`}
                        label="Seller"
                        value="SELLER"
                        name="role"
                        type="radio"
                        checked={user.role === 'SELLER'}
                        onChange={handleRadioChange}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="txtUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={user.username}
                        placeholder="Username"
                        name="username"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="txtPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        required
                        type="password"
                        value={user.password}
                        placeholder="Password"
                        name="password"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="txtConfirmPassword">
                    <Form.Label>Confirm Password: </Form.Label>
                    <Form.Control
                        required
                        type="password"
                        value={user.confirmPassword}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="txtFirstName">
                    <Form.Label>First Name: </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={user.firstName}
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="txtLastName">
                    <Form.Label>Last Name: </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={user.lastName}
                        placeholder="Last Name"
                        name="lastName"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="txtEmail">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                        required
                        type="email"
                        value={user.email}
                        placeholder="Email"
                        name="email"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Col className="text-right">
                    <Button type="submit" id="btnSubmit">Register</Button>
                    <Button type="button"
                            id="btnCancel"
                            className="ml-2"
                            variant="secondary"
                            onClick={handleCancel}>Cancel</Button>
                </Col>
            </Row>
        </Form>
    )
}