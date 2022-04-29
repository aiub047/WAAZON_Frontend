import {Form, Row, Col, InputGroup, Button, Alert} from 'react-bootstrap';
import {useState} from 'react';
import {Rating} from 'react-simple-star-rating'

import apiService from '../services/apiService';

export const ReviewForm = (props) => {
    const [validated, setValidated] = useState(false);
    let {id} = props;

    const cleanReview = {
        stars: 3,
        comment: ""
    };

    const [review, setReview] = useState(cleanReview);

    const handleRateChange = (rating) => {
        setReview({...review, stars: rating});
    };

    const handleCancel = () => {
        setReview(cleanReview);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        if (form.checkValidity() === true) {
            saveReview();
        }
        setValidated(true);
    };

    const handleFieldChange = (event) => {
        setReview({...review, [event.target.name]: event.target.value});
    };

    const saveReview = async () => {
        try {
            await apiService.post(`products/${id}/reviews`, review, {
                successMessage: `Successfully saved your review. It will be shown after the admin's approval`
            });

            handleCancel();
            if (props.onSave) {
                props.onSave();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <br/>
            <br/>
            <h6>Review</h6>
            <hr/>
            <Row className="mb-3">
                <Col>
                    <Rating onClick={handleRateChange} ratingValue={review.stars}/>
                </Col>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-3" controlId="txtComment">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="comment"
                        value={review.comment}
                        placeholder="Comment"
                        onChange={handleFieldChange}
                        required
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Col className="text-right">
                    <Button type="submit" id="btnSubmit">Save review</Button>
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