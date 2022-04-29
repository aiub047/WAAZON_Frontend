import {Form, Row, Col, InputGroup, Button, Alert} from 'react-bootstrap';
import {useState, useEffect} from 'react';

import {
    useParams
} from "react-router-dom";
import apiService from '../services/apiService';

export const ProductForm = ({history}) => {
    const [validated, setValidated] = useState(false);
    let {id} = useParams();

    const cleanProduct = {
        id: "",
        name: "",
        price: 0.0,
        description: "",
        numberInStock: 0,
        image: ""
    };

    const [product, setProduct] = useState(cleanProduct);

    const loadProduct = async () => {
        if (id !== 'new') {
            const data = await apiService.get(`products/${id}`);
            setProduct(data);
        }
    }

    useEffect(() => {
        loadProduct().then(r => {
        });
    }, []);

    const handleFieldChange = (event) => {
        setProduct({...product, [event.target.name]: event.target.value});
    };

    const handleCancel = () => {
        history.push('/products');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        if (form.checkValidity() === true) {
            saveProduct().then(r => {
            });
        }

        setValidated(true);
    };

    const saveProduct = async () => {
        try {
            const data = id === 'new' ?
                await apiService.post('products', product) :
                await apiService.put(`products/${id}`, product);
            history.push(`/products/${data.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h2>Create/Edit Product</h2>
            <hr/>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="txtTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required
                        name="title"
                        value={product.title}
                        type="text"
                        placeholder="Title"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="txtPrice">
                    <Form.Label>Price</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                        <Form.Control
                            type="number"
                            name="price"
                            aria-describedby="inputGroupPrepend"
                            required
                            step="0.01"
                            placeholder="Price"
                            value={product.price}
                            onChange={handleFieldChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a price.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="8" controlId="txtDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        name="description"
                        value={product.description}
                        type="text"
                        placeholder="Description"
                        onChange={handleFieldChange}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a description.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="txtNumberInStock">
                    <Form.Label>Number In Stock</Form.Label>
                    <Form.Control
                        type="number"
                        name="numberInStock"
                        value={product.numberInStock}
                        placeholder="Number In Stock"
                        required
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid number.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md="12" controlId="txtImage">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="image"
                        value={product.image}
                        placeholder="Image URL"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid number.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Col className="text-right">
                    <Button type="submit" id="btnSubmit">Save product</Button>
                    <Button type="button"
                            id="btnCancel"
                            variant="secondary"
                            className="ml-2"
                            onClick={handleCancel}>Cancel</Button>
                </Col>
            </Row>
        </Form>
    )
}