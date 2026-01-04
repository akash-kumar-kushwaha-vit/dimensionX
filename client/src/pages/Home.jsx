import React from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="position-relative hero-gradient-bg text-white py-5" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
                <Container className="position-relative z-1 text-center">
                    <div className="fade-in-up">
                        <span className="d-inline-block px-3 py-1 rounded-pill bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-25 mb-4 fw-medium text-white shadow-sm">
                            ✨ The #1 Campus Lost & Found Platform
                        </span>

                        <h1 className="display-1 fw-bold mb-4" style={{ letterSpacing: '-0.02em', textShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            Instantly find what <br /> you've lost.
                        </h1>

                        <p className="lead fw-light mb-5 mx-auto" style={{ maxWidth: '600px', fontSize: '1.25rem', opacity: '0.9' }}>
                            Captivate your audience with stunning presentations. With just one click, turn your ideas into slides that clearly convey your message.
                        </p>

                        {/* Search Pill */}


                        {/* Action Buttons */}
                        <div className="d-flex justify-content-center gap-3">
                            <Button as={Link} to="/lost-items" className="btn-lg rounded-pill px-5 py-3 fw-bold bg-white text-primary border-white shadow-lg hover-scale">
                                😥 I Lost Something
                            </Button>
                            <Button as={Link} to="/found-items" className="btn-lg rounded-pill px-5 py-3 fw-bold bg-opacity-25 bg-white text-white border-white backdrop-blur shadow-lg hover-scale">
                                🎉 I Found Something
                            </Button>
                        </div>
                    </div>
                </Container>

                {/* Abstract Shapes */}
                <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '150px', background: 'linear-gradient(to top, #f8fafc, transparent)' }}></div>
            </section>

            {/* Features Section */}
            <section className="py-5 bg-light">
                <Container className="py-5">
                    <Row className="g-4">
                        {[
                            { icon: "🛡️", title: "Secure & Verified", desc: "Only verified university students can access." },
                            { icon: "⚡", title: "Instant Alerts", desc: "Get notified immediately when items are found." },
                            { icon: "🤝", title: "Community Driven", desc: "Help your peers and build a safer campus." }
                        ].map((feature, i) => (
                            <Col md={4} key={i}>
                                <div className="p-4 bg-white rounded-4 shadow-sm border border-light h-100 text-center hover-scale">
                                    <div className="display-4 mb-3">{feature.icon}</div>
                                    <h3 className="h5 fw-bold mb-2">{feature.title}</h3>
                                    <p className="text-muted mb-0">{feature.desc}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Home;
