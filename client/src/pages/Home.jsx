import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <section className="position-relative overflow-hidden py-5 mb-5" style={{ background: 'radial-gradient(circle at top right, #eef2ff, #f8fafc)' }}>
                <Container className="py-5">
                    <Row className="align-items-center justify-content-center text-center">
                        <Col lg={10} className="fade-in-up">
                            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-4 fw-bold">
                                🚀 The Official Campus Lost & Found
                            </span>
                            <h1 className="display-3 fw-bolder mb-4 text-dark" style={{ letterSpacing: '-1px' }}>
                                Find what you lost, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary" style={{
                                    background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>return what you found.</span>
                            </h1>
                            <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: '600px' }}>
                                A secure, community-driven platform to help students reunite with their belongings. Verified with Google OAuth for your safety.
                            </p>
                            <div className="d-flex justify-content-center gap-3">
                                <Button as={Link} to="/lost-items" variant="danger" size="lg" className="px-5 shadow-lg border-0" style={{ background: 'var(--danger)' }}>
                                    I Lost Something
                                </Button>
                                <Button as={Link} to="/found-items" variant="success" size="lg" className="px-5 shadow-lg border-0" style={{ background: 'var(--success)' }}>
                                    I Found Something
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>

                {/* Decorative blobs */}
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'var(--primary)', opacity: '0.05', filter: 'blur(80px)', borderRadius: '50%', zIndex: '-1' }}></div>
                <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '300px', height: '300px', background: 'var(--secondary)', opacity: '0.05', filter: 'blur(80px)', borderRadius: '50%', zIndex: '-1' }}></div>
            </section>

            <Container className="mb-5 pb-5">
                <Row className="g-4">
                    <Col md={4} className="fade-in-up delay-100">
                        <div className="p-4 h-100 bg-white shadow-sm rounded-4 border border-light text-center hover-scale transition">
                            <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle mb-4" style={{ width: 64, height: 64, fontSize: '1.5rem' }}>
                                🛡️
                            </div>
                            <h3 className="h5 fw-bold mb-3">Verified Students</h3>
                            <p className="text-muted mb-0">No strangers. Only students with valid college emails can access the platform.</p>
                        </div>
                    </Col>
                    <Col md={4} className="fade-in-up delay-200">
                        <div className="p-4 h-100 bg-white shadow-sm rounded-4 border border-light text-center hover-scale transition">
                            <div className="d-inline-flex align-items-center justify-content-center bg-warning bg-opacity-10 text-warning rounded-circle mb-4" style={{ width: 64, height: 64, fontSize: '1.5rem' }}>
                                ⚡
                            </div>
                            <h3 className="h5 fw-bold mb-3">Instant Alerts</h3>
                            <p className="text-muted mb-0">Post items in seconds. The community jumps into action to help you search.</p>
                        </div>
                    </Col>
                    <Col md={4} className="fade-in-up delay-300">
                        <div className="p-4 h-100 bg-white shadow-sm rounded-4 border border-light text-center hover-scale transition">
                            <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle mb-4" style={{ width: 64, height: 64, fontSize: '1.5rem' }}>
                                🤝
                            </div>
                            <h3 className="h5 fw-bold mb-3">Community First</h3>
                            <p className="text-muted mb-0">Built by students, for students. Helping each other makes our campus better.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;
