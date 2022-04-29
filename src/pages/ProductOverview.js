import React, {useState} from "react";
import {Card, Button, Row, Col, Form} from "react-bootstrap";

import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import './ProductOverview.css'
import {RatingView} from "react-simple-star-rating";
// import {Rating} from "react-simple-star-rating";

export const ProductOverview = (props) => {
    const {product} = props;

    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.shoppingCart.find(i => i.product.id === product.id));

    const [buyInfo, setBuyInfo] = useState({
        product,
        quantity: 1
    });

    const checkAvailability = () => {
        const quantity = +buyInfo.quantity + ((cartItem && cartItem.quantity) || 0);
        return quantity <= product.numberInStock;
    }

    const handleBuy = (e) => {
        if (!checkAvailability()) {
            alert('Quantity unavailable');
            return;
        }

        dispatch({type: 'addProduct', cartItem: buyInfo});
        console.log('Added to Cart');
    }

    return (

        <div className="col-md-3 cardDiv">
            <Link to={`/shop/${product.id}`}>
                <Card>
                    <div className="divImg">
                        <Card.Img variant="top" className="cardImage" src={product.image}/>
                    </div>
                    <div className="divInfo">
                        <Row noGutters={true}>
                            <Col>
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text style={{fontSize: '15px'}}>
                                        <b>Price: ${product.price}</b>
                                        <br/>[ In-stock: {product.numberInStock} ]
                                    </Card.Text>
                                    <Card.Text style={{fontSize: '12px'}}>
                                        <RatingView ratingValue={product.rating} size={20}/>
                                    </Card.Text>
                                </Card.Body>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </Link>
        </div>
    );
}