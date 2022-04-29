import React, {useState} from "react";
import {useEffect} from "react";
import {Card, Button, Row, Col, Form, ListGroup} from "react-bootstrap";

import {useDispatch, useSelector} from 'react-redux';
import {useParams} from "react-router";
import {RatingView} from "react-simple-star-rating";
import apiService from "../services/apiService";
import {ReviewForm} from "./ReviewForm";
import { useHistory} from "react-router-dom";

export const BuyProduct = (props) => {
    const history = useHistory();

    const isAuthenticated = useSelector(state => state.isAuthenticated);
    if (!isAuthenticated) {
        history.push('/signin');
    }

    let {id} = useParams();
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);

    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.shoppingCart.find(item => item.product.id === id));

    const [buyInfo, setBuyInfo] = useState({
        product,
        quantity: 1
    });

    const loadProduct = async () => {
        if (id) {
            const data = await apiService.get(`products/${id}`);
            setProduct(data);
            setBuyInfo({...buyInfo, product: data});
        }
    }

    const loadReviews = async () => {
        if (id) {
            const data = await apiService.get(`products/${id}/reviews`);
            setReviews(data);
        }
    }

    useEffect(() => {
        loadProduct();
        loadReviews();
    }, [id]);

    const handleBuy = (event) => {
        if (!checkAvailability()) {
            alert('Quantity is unavailable');
            return;
        }
        dispatch({type: 'addProduct', cartItem: buyInfo});
        console.log('Added to Cart');
    }

    const handleFieldChange = (event) => {
        setBuyInfo({...buyInfo, [event.target.name]: event.target.value});
    };

    const checkAvailability = () => {
        const quantity = +buyInfo.quantity + ((cartItem && cartItem.quantity) || 0);
        return quantity <= product.numberInStock;
    }

    const handleBack = () => {
        history.push('/shop')
    }

    const handleSaveReview = () => {
    }

    return (
        <div>
            <Row>
                <Col>
                    <Card style={{width: '100%'}}>
                        <Row noGutters={true}>
                            <Col className="text-center">
                                <Card.Img variant="top" src={product.image}
                                          style={{maxHeight: '300px', maxWidth: '300px'}}/>
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Title className="text-primary">Price: ${product.price}</Card.Title>
                                    <Card.Text>
                                        {product.description}
                                    </Card.Text>
                                    <Card.Text>
                                        [ In-stock: {product.numberInStock} ]
                                    </Card.Text>
                                    <Card.Text>
                                        <RatingView ratingValue={product.rating} size={15}/>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <Col md="3">
                                            <Form.Control
                                                id={`inputQuantity-${product.id}`}
                                                required
                                                style={{width: '100px'}}
                                                value={buyInfo.quantity}
                                                type="number"
                                                name="quantity"
                                                placeholder="Quantity"
                                                onChange={handleFieldChange}
                                            />
                                        </Col>
                                        <Button id={`btnBuy-${product.id}`} variant="primary" onClick={handleBuy}>
                                            Add to Cart</Button>
                                        &nbsp;&nbsp;&nbsp;<Button id={`btnBack-${product.id}`} variant="secondary"
                                                                  onClick={handleBack}>
                                        Back</Button>
                                    </Row>
                                </Card.Footer>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ReviewForm id={product.id} onSave={handleSaveReview}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Reviews</h4>
                    <ListGroup>
                        {reviews.map(review => (
                            <ListGroup.Item key={review.id}>
                                <RatingView size={15} ratingValue={review.stars}/>
                                <span className="ml-3">{review.comment}</span>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
}