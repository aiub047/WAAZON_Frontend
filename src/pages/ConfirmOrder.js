import {useSelector, useDispatch} from "react-redux"
import {Table, Button, Row, Col, Card} from "react-bootstrap";
import axios from "axios";

export const ConfirmOrder = ({history}) => {
    const cartItems = useSelector(state => state.shoppingCart);

    const total = useSelector(state => state.shoppingCart
        .map(i => i.quantity * i.product.price)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0));


    const personalInfo = useSelector(state => state.personalInfo);
    const paymentInfo = useSelector(state => state.paymentInfo);

    const dispatch = useDispatch();

    const handlePlaceOrder = (event) => {
        if (window.confirm('Are you sure?')) {
            placeOrder().then(r => {
            });
        }
    }

    const placeOrder = async () => {
        const resp = await axios.post('http://localhost:8089/orders', {
            personalInfo,
            paymentInfo: {...paymentInfo, dateValid: new Date(paymentInfo.expYear, paymentInfo.expMonth, 1)},
            lineItems: cartItems
        });

        dispatch({type: 'resetShoppingCart'});
        history.push('/orders');
    }

    return (
        <div>
            <Row>
                <Col>
                    <h2>
                        Order confirmation
                    </h2>
                </Col>
                <Col className="text-right">
                    <Button type="button" onClick={handlePlaceOrder}>Place Order</Button>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>Personal Information</Card.Header>
                        <Card.Body>
                            <Card.Title>{personalInfo.name}</Card.Title>
                            <Card.Title>{personalInfo.email}</Card.Title>
                            <Card.Title>{personalInfo.phone}</Card.Title>
                            <Card.Text>
                                {`${personalInfo.street} ${personalInfo.city} ${personalInfo.state} ${personalInfo.zip}`}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>Payment Information</Card.Header>
                        <Card.Body>
                            <Card.Title>{paymentInfo.cartType}</Card.Title>
                            <Card.Title>{paymentInfo.number}</Card.Title>
                            <Card.Title>{paymentInfo.expMonth}/{paymentInfo.expYear}</Card.Title>
                            <Card.Text>
                                {paymentInfo.validationCode}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <hr/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map(i => (
                    <tr key={i.product.id}>
                        <td>{i.product.id}</td>
                        <td>{i.product.title}</td>
                        <td>${i.product.price}</td>
                        <td>{i.quantity}</td>
                        <td>${i.quantity * i.product.price}</td>
                    </tr>
                ))}


                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="6" className="text-right">
                        <strong> Total: ${total}</strong>
                    </td>
                </tr>
                </tfoot>
            </Table>

        </div>
    );
}