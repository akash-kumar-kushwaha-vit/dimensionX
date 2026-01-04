import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "./Profile.css"
import {
    Container,
    Row,
    Col,
    Alert,
    Form,
    Button,
    Badge,
    Card,
    ProgressBar
} from 'react-bootstrap';
import ItemCard from '../components/ItemCard';
import { AuthContext } from '../context/AuthContext';
import {
    Camera,
    Edit,
    Trash2,
    Package,
    Clock,
    User,
    Mail,
    Grid,
    Filter
} from 'lucide-react';

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [myItems, setMyItems] = useState([]);
    const [msg, setMsg] = useState('');
    const [uploading, setUploading] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    const fetchMyItems = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/items/my-items', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMyItems(res.data);
        } catch (error) {
            console.error(error);
            setMsg('Failed to load items');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/items/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMsg('Item deleted successfully');
            fetchMyItems();
            setTimeout(() => setMsg(''), 3000);
        } catch (error) {
            console.error(error);
            setMsg('Failed to delete item');
        }
    };

    const handlePictureUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setMsg('Image size should be less than 5MB');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('picture', file);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.put('/api/auth/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    // You can use this for a progress bar if needed
                }
            });

            const updatedUser = res.data.user;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            if (setUser) setUser(updatedUser);
            setMsg('Profile picture updated successfully!');
            setTimeout(() => setMsg(''), 3000);
        } catch (error) {
            console.error(error);
            setMsg(error.response?.data?.message || 'Failed to upload picture');
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        fetchMyItems();
    }, []);

    const pictureUrl = user?.picture?.startsWith('uploads/')
        ? `http://localhost:5000/${user.picture}?t=${Date.now()}`
        : user?.picture;

    const filteredItems = myItems.filter(item => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'lost') return item.type === 'lost';
        if (activeFilter === 'found') return item.type === 'found';
        return true;
    });

    const stats = [
        {
            label: 'Total Posts',
            value: myItems.length,
            icon: <Package className="text-primary" size={24} />,
            color: 'primary'
        },
        {
            label: 'Lost Items',
            value: myItems.filter(i => i.type === 'lost').length,
            icon: <Clock className="text-danger" size={24} />,
            color: 'danger'
        },
        {
            label: 'Found Items',
            value: myItems.filter(i => i.type === 'found').length,
            icon: <Clock className="text-success" size={24} />,
            color: 'success'
        }
    ];

    return (
        <Container className="py-4 py-lg-5">
            {/* Profile Header */}
            <Card className="border-0 shadow-lg mb-5 overflow-hidden fade-in-up">
                <div className="bg-gradient-primary" style={{ height: '120px' }}></div>
                <Card.Body className="pt-0 position-relative">
                    <div className="d-flex flex-column flex-md-row align-items-start gap-4">
                        <div className="position-relative mt-n5">
                            <div className="profile-avatar-wrapper">
                                {pictureUrl ? (
                                    <img
                                        src={pictureUrl}
                                        alt="Profile"
                                        className="profile-avatar"
                                        width="140"
                                        height="140"
                                    />
                                ) : (
                                    <div className="profile-avatar-placeholder">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <Form.Label
                                    htmlFor="picture-upload"
                                    className="profile-upload-btn"
                                    title="Change Profile Picture"
                                >
                                    {uploading ? (
                                        <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        <Camera size={20} />
                                    )}
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    id="picture-upload"
                                    onChange={handlePictureUpload}
                                    accept="image/*"
                                    className="d-none"
                                    disabled={uploading}
                                />
                            </div>
                        </div>

                        <div className="flex-grow-1 mt-3 mt-md-0">
                            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                                <h1 className="h2 fw-bold mb-0">{user?.name}</h1>
                                <Badge bg="light" text="dark" className="px-3 py-2 fw-normal">
                                    <User size={14} className="me-1" /> Student
                                </Badge>
                            </div>

                            <div className="d-flex align-items-center text-muted mb-4">
                                <Mail size={16} className="me-2" />
                                <span>{user?.email}</span>
                            </div>

                            <div className="stats-container">
                                {stats.map((stat, index) => (
                                    <div key={index} className="stat-card">
                                        <div className="stat-icon">{stat.icon}</div>
                                        <div className="stat-value">{stat.value}</div>
                                        <div className="stat-label">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {/* Message Alert */}
            {msg && (
                <Alert
                    variant="info"
                    onClose={() => setMsg('')}
                    dismissible
                    className="alert-custom fade-in-up"
                >
                    {msg}
                </Alert>
            )}

            {/* Page Header with Filters */}
            <div className="page-header mb-4 fade-in-up">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div>
                        <h2 className="page-title">My Posts</h2>
                        <p className="text-muted mb-0">
                            Manage your lost and found item listings
                        </p>
                    </div>

                    <div className="d-flex gap-2">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className={`px-3 ${activeFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            <Grid size={16} className="me-2" />
                            All
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className={`px-3 ${activeFilter === 'lost' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('lost')}
                        >
                            😢 Lost
                        </Button>
                        <Button
                            variant="outline-success"
                            size="sm"
                            className={`px-3 ${activeFilter === 'found' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('found')}
                        >
                            🎉 Found
                        </Button>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="text-center py-5 fade-in-up">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading your posts...</p>
                </div>
            ) : (
                <>
                    {/* Posts Grid */}
                    {filteredItems.length > 0 ? (
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {filteredItems.map((item, index) => (
                                <Col
                                    key={item._id}
                                    className={`fade-in-up delay-${(index % 3) + 1}`}
                                >
                                    <ItemCard
                                        item={item}
                                        isOwnPost={true}
                                        onDelete={handleDelete}
                                    />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Card className="border-0 shadow-sm text-center py-5 my-4 fade-in-up">
                            <Card.Body className="p-5">
                                <div className="empty-state-icon mb-4">
                                    <Package size={80} />
                                </div>
                                <h3 className="empty-state-title mb-3">
                                    {activeFilter === 'all' ? 'No posts yet' : 'No matching posts'}
                                </h3>
                                <p className="empty-state-text mb-4">
                                    {activeFilter === 'all'
                                        ? 'Start by posting a lost or found item to help others!'
                                        : `You haven't posted any ${activeFilter} items yet.`
                                    }
                                </p>
                                <Button
                                    variant="primary"
                                    href="/post-item"
                                    className="px-4 py-2"
                                >
                                    <Edit size={18} className="me-2" />
                                    Create Your First Post
                                </Button>
                            </Card.Body>
                        </Card>
                    )}
                </>
            )}

            {/* Upload Progress (optional) */}
            {uploading && (
                <div className="position-fixed bottom-0 start-0 end-0 p-3 bg-white shadow-lg border-top">
                    <Container>
                        <div className="d-flex align-items-center justify-content-between">
                            <span className="fw-medium">Uploading profile picture...</span>
                            <ProgressBar now={100} animated className="w-50" />
                        </div>
                    </Container>
                </div>
            )}
        </Container>
    );
};

export default Profile;