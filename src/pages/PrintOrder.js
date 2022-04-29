import {useState} from "react";
import {Table, Button, Row, Col, Modal} from 'react-bootstrap';

import {jsPDF} from "jspdf";

export const PrintOrder = ({order}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePDF = () => {
        const pdf = new jsPDF('p', 'pt', 'letter');

        const source = document.getElementById(`print-order-${order.id}`);

        pdf.html(source, {
            callback: function (doc) {
                doc.save(`order_${order.id}.pdf`);
            },
            x: 10,
            y: 10
        });
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Print
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Print Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id={`print-order-${order.id}`}>
                        <Row>
                            <Col>
                                <h2>
                                    Order # {order.id}
                                </h2>
                            </Col>
                            <Col className="text-right">
                                <h5>
                                    Date: {order.createdOn} ({order.orderStatus})
                                </h5>
                            </Col>
                        </Row>

                        <hr/>
                        <Table bordered>
                            <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {order.lineItems.map(i => (
                                <tr key={i.id}>
                                    <td>
                                        {i.product.title}
                                    </td>
                                    <td>
                                        {i.quantity}
                                    </td>
                                    <td>
                                        ${i.product.price}
                                    </td>
                                    <td>
                                        ${i.product.price * i.quantity}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colspan="4" className="text-right">
                                    Total: ${order.lineItems.map(i => i.quantity * i.product.price)
                                    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)}
                                </td>
                            </tr>
                            </tbody>
                        </Table>

                    </div>
                    <Row>
                        <Col>
                            <Button onClick={handlePDF}>
                                PDF
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}