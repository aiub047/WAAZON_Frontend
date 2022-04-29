import {useState, useEffect} from "react";
import {Table, Button, Row, Col} from 'react-bootstrap';

import {RatingView} from "react-simple-star-rating";
import apiService from "../services/apiService";

export const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const loadReviews = async () => {
        const data = await apiService.get('admin/reviews');
        setReviews(data);
    }

    useEffect(() => {
        loadReviews().then(r => {
        });
    }, []);


    const approveReview = async (id) => {
        if (window.confirm("Are you sure you want to approve this review?")) {
            const review = reviews.find(r => r.id === +id);
            await apiService.get(`admin/products/${review.product.id}/reviews/${id}?approved=true`);
            await loadReviews();
        }
    }

    const handleApprove = (e) => {
        approveReview(e.target.value).then(r => {
        });
    }

    return (
        <div>
            <Row>
                <Col>
                    <h2>
                        Reviews
                    </h2>
                </Col>
            </Row>

            <hr/>
            <Table id="tableMain" striped bordered hover>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Stars</th>
                    <th>Comment</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {reviews.map(r => (
                    <tr key={r.id}>
                        <td>
                            {r.product.title}
                        </td>
                        <td>
                            <RatingView size={15} ratingValue={r.stars}/></td>
                        <td>{r.comment}</td>
                        <td><Button
                            id={`btnApprove-${r.id}`}
                            disabled={r.status !== 'Pending'}
                            variant="primary"
                            onClick={handleApprove}>Approve
                            value={r.id}
                        </Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>


        </div>
    );
}