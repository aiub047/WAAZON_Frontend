import {useSelector, useDispatch} from "react-redux"
import {Table, Button, Row, Col} from "react-bootstrap";

export const ShoppingCart = ({history}) => {
    const cartItems = useSelector(state => state.shoppingCart);
    const total = useSelector(state => state.shoppingCart
        .map(item => item.quantity * item.product.price)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0));

    const dispatch = useDispatch();

    const checkAvailability = (id) => {
        const cartItem = cartItems.find(item => item.product.id === +id);
        const quantity = +cartItem.quantity + 1;
        return quantity <= cartItem.product.numberInStock;
    }

    const handleRemove = (event) => {
        dispatch({type: 'removeProduct', cartItem: {product: {id: +event.target.value}, quantity: 1}});
    }

    const handleIncrease = (event) => {
        if (!checkAvailability(+event.target.value)) {
            alert('Quantity unavailable');
            return;
        }
        dispatch({type: 'addProduct', cartItem: {product: {id: +event.target.value}, quantity: 1}});
    }

    const handleReduce = (e) => {
        dispatch({type: 'reduceQuantity', cartItem: {product: {id: +e.target.value}, quantity: 1}});
    }

    const handleCheckout = (e) => {
        history.push('/personal-info');
    }

    return (
        <div>
            <Row>
                <Col>
                    <h2>
                        Shopping Cart
                    </h2>
                </Col>
                <Col className="text-right">
                    <Button type="button" onClick={handleCheckout}>Check out</Button>
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
                {cartItems.map(item => (
                    <tr key={item.product.id}>
                        <td>{item.product.id}</td>
                        <td>{item.product.title}</td>
                        <td>${item.product.price}</td>
                        <td>
                            <Button className="mr-3" variant="danger"
                                    value={item.product.id}
                                    onClick={handleReduce}>-</Button>
                            {item.quantity}
                            <Button className="ml-3" variant="success"
                                    value={item.product.id}
                                    onClick={handleIncrease}>+</Button>

                        </td>
                        <td>${item.quantity * item.product.price}</td>
                        <td><Button variant="danger"
                                    value={item.product.id}
                                    onClick={handleRemove}>Remove</Button></td>
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