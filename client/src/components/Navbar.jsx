import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <BsNavbar bg="light" expand="lg" className="shadow-sm mb-4">
            <Container>
                <BsNavbar.Brand as={Link} to="/" className="fw-bold text-primary">
                    🏫 College Lost & Found
                </BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/lost-items">Lost Items</Nav.Link>
                                <Nav.Link as={Link} to="/found-items">Found Items</Nav.Link>
                                <Nav.Link as={Link} to="/post-item">Post Item</Nav.Link>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Button variant="outline-danger" size="sm" className="ms-2" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
};

export default Navbar;
