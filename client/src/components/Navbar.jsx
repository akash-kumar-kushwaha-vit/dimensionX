import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Navbar as BsNavbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <BsNavbar expand="lg" sticky="top" className="navbar">
            <Container>
                <BsNavbar.Brand as={Link} to="/">
                    <span className="fs-3 me-2">🎓</span>
                    <span style={{ background: 'linear-gradient(to right, #4f46e5, #ec4899)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Lost & Found</span>
                </BsNavbar.Brand>

                <BsNavbar.Toggle aria-controls="navbar-nav" className="border-0 shadow-none px-0">
                    <span className="navbar-toggler-icon"></span>
                </BsNavbar.Toggle>

                <BsNavbar.Collapse id="navbar-nav">
                    <Nav className="mx-auto align-items-center gap-1">
                        <Nav.Link as={Link} to="/" className={isActive('/')}>Home</Nav.Link>
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/lost-items" className={isActive('/lost-items')}>Lost Items</Nav.Link>
                                <Nav.Link as={Link} to="/found-items" className={isActive('/found-items')}>Found Items</Nav.Link>
                                <Nav.Link as={Link} to="/post-item" className={isActive('/post-item')}>Post Item</Nav.Link>
                                <Nav.Link as={Link} to="/chat" className={isActive('/chat')}>Messages</Nav.Link>
                            </>
                        )}
                    </Nav>

                    <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                        {user ? (
                            <Dropdown align="end">
                                <Dropdown.Toggle variant="transparent" className="p-0 border-0 after-none d-flex align-items-center gap-2">
                                    <span className="text-dark fw-bold d-none d-lg-block">{user.name.split(' ')[0]}</span>
                                    {user.picture ? (
                                        <img src={user.picture.startsWith('uploads/') ? `http://localhost:5000/${user.picture}` : user.picture}
                                            alt="Profile"
                                            className="rounded-circle border border-2 border-white shadow-sm"
                                            width="40" height="40" style={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: 40, height: 40 }}>
                                            {user.name.charAt(0)}
                                        </div>
                                    )}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="shadow-lg border-0 rounded-4 mt-2 p-2" style={{ minWidth: '200px' }}>
                                    <Dropdown.Header>Signed in as <br /><strong className="text-dark">{user.email}</strong></Dropdown.Header>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as={Link} to="/profile" className="rounded-2 py-2">👤 My Profile</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout} className="rounded-2 py-2 text-danger">🚪 Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Button as={Link} to="/login" variant="primary" className="px-4 py-2 rounded-pill shadow-sm">
                                Login
                            </Button>
                        )}
                    </div>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
};

export default Navbar;
