import {useState, useEffect} from "react";
import {Table, Button, Row, Col, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import {useSelector} from "react-redux";
import apiService from "../services/apiService";
import {PrintOrder} from "./PrintOrder";

export const Orders = ({history}) => {
    const [orders, setOrders] = useState([]);
    const userDetails = useSelector(state => state.userDetails) || {};

    useEffect(() => {
        loadOrders().then(r => {
        });
    }, []);

    const loadOrders = async () => {
        const data = await apiService.get(
            userDetails.roles === 'BUYER' ? 'orders'
                : `seller/${userDetails.username}/orders`
        );
        setOrders(data || []);
    }

    const cancelOrder = async (id) => {
        if (window.confirm("Are you sure to cancel the order?")) {
            if (userDetails.roles === 'BUYER') {
                await apiService.delete(`buyer/${userDetails.username}/order/${id}`);
            } else {
                await apiService.post(`seller/${userDetails.username}/order/cancel/${id}`);
            }
            await loadOrders();
        }
    }

    const handleCancel = (event) => {
        cancelOrder(event.target.value).then(r => {
        });
    }

    const changeStatus = async (id, status) => {
        if (window.confirm("Are you sure to change the status?")) {

            if (status === 'Shipped') {
                await apiService.post(`seller/${userDetails.username}/order/shipped/${id}`);
            } else if (status === 'On the way') {
                await apiService.post(`seller/${userDetails.username}/order/ontheway/${id}`);
            } else if (status === 'Delivered') {
                await apiService.post(`seller/${userDetails.username}/order/delivered/${id}`);
            }
            await loadOrders();
        }
    }

    const handleStatusChange = (id, status) => {
        changeStatus(id, status).then(r => {
        });
    }

    return (
        <div>
            <Row>
                <Col>
                    <h2>
                        Orders
                    </h2>
                </Col>
            </Row>

            <hr/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Order #</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {orders.map(o => (
                    <tr key={o.id}>
                        <td>
                            {o.id}
                        </td>
                        <td>{o.lineItems.map(i => (
                            <div>
                                {i.product.title} ({i.quantity} * ${i.product.price})
                            </div>
                        ))}</td>
                        <td>${o.lineItems.map(i => i.product.price * i.quantity).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</td>
                        <td>
                            {userDetails.roles === 'BUYER' ? (<span className="text-info">{o.orderStatus}</span>) :
                                (<ToggleButtonGroup type="radio" name="statuses" defaultValue={o.orderStatus}
                                                    onChange={status => handleStatusChange(o.id, status)}
                                >
                                    <ToggleButton id="tbg-radio-0" variant="outline-success" value={'Pending'}>
                                        Pending
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-2" variant="outline-success" value={'Shipped'}>
                                        Shipped
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-1" variant="outline-success" value={'On the way'}>
                                        On the way
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-3" variant="outline-success" value={'Delivered'}>
                                        Delivered
                                    </ToggleButton>
                                </ToggleButtonGroup>)}
                        </td>
                        <td>
                            <Button
                                id={`btnCancel-${o.id}`}
                                value={o.id}
                                variant="primary"
                                disabled={o.orderStatus === 'Shipped' || o.orderStatus === 'Delivered'}
                                onClick={handleCancel}>Cancel</Button>
                        </td>
                        <td>
                            <PrintOrder order={o}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>


        </div>
    );
}