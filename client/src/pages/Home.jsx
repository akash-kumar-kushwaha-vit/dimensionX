import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container className="text-center py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1 className="display-4 fw-bold mb-4">Welcome to College Lost & Found</h1>
                    <p className="lead text-muted mb-5">
                        Lost something on campus? Or found something that isn't yours?
                        <br />
                        Connect with your peers to return items to their rightful owners.
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <Button as={Link} to="/lost-items" variant="danger" size="lg">I Lost Something</Button>
                        <Button as={Link} to="/found-items" variant="success" size="lg">I Found Something</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
