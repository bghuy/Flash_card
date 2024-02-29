import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { uploadCollectionPoster } from '../../../services/uploadService'
import { UserContext } from './../../../context/UserContext.js';
import { createCollection } from '../../../services/myCollectionService.js'
import { logout } from '../../../services/userService.js'
const ModalCreateCollection = (props) => {
    const defaultCollectionDetail = {
        title: '',
        description: ''
    };
    const defaultValidInputs = {
        title: true,
    }
    const { show, onHide, reload } = props;
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [validImage, setValidImage] = useState(true);
    const [collectionDetail, setCollectionDetail] = useState(defaultCollectionDetail);
    const [validInputs, setValidInputs] = useState({ ...defaultValidInputs });

    const { user, logoutContext } = useContext(UserContext);
    const handleCloseModalUser = () => {
        setImageFile(null);
        setImageUrl(null);
        setValidImage(true);
        setValidInputs(defaultValidInputs);
        setCollectionDetail(defaultCollectionDetail);
        onHide();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (allowedTypes.includes(file.type)) {
                setImageFile(file);
                const posterUrl = URL.createObjectURL(file);
                setImageUrl(posterUrl);
                setValidImage(true);
            } else {
                setImageUrl(() => null);
                setValidImage(() => null);
                setValidImage(false);

                // Reset the input value to clear the invalid file selected
                e.target.value = null;
            }
        }
    };
    const handleOnChangeInput = (value, name) => {
        try {
            let _data = { ...collectionDetail };
            _data[name] = value;
            setCollectionDetail(() => _data);
            setValidInputs(() => defaultValidInputs);
        } catch (error) {
            console.log(error);
        }
    };
    const checkValidateTitle = () => {
        let isValid = true;
        const { title } = collectionDetail;

        if (!title.trim()) {
            toast.error('Title can not be empty');
            setValidInputs(() => false);
            isValid = false;
        }
        return isValid;
    };
    const handleConfirmCreateCollection = async () => {
        try {
            const isValid = checkValidateTitle();
            if (isValid) {
                let data = {
                    title: collectionDetail.title, description: collectionDetail.description, email: user.email
                }
                const responseUpdate = await createCollection(data);
                if (responseUpdate && +responseUpdate.EC === 0 && responseUpdate.EM && responseUpdate.DT) {
                    setValidInputs(defaultValidInputs);
                    setCollectionDetail(defaultCollectionDetail)
                    if (imageFile) {
                        const formData = new FormData();
                        formData.append('collectionId', +responseUpdate.DT.id);
                        formData.append('file', imageFile);
                        const response = await uploadCollectionPoster(formData);
                        if (response && +response.EC === 0 && response.EM) {
                            // toast.success(response.EM);

                        } else {
                            toast.error(response.EM);
                        }
                        setImageFile(null);
                        setImageUrl(null);
                        setValidImage(true);
                    }
                    toast.success(responseUpdate.EM);
                    await reload();
                    handleCloseModalUser();
                }
                else {
                    toast.error(responseUpdate.EM);
                    setCollectionDetail(defaultCollectionDetail)
                    setValidInputs(defaultValidInputs);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("something is wrong!")
            await logout();
            logoutContext()
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            centered
            show={show}
            onHide={handleCloseModalUser}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Upload poster
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        onChange={(e) => handleOnChangeInput(e.target.value, "title")}
                        value={collectionDetail.title}
                        isInvalid={!validInputs.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        Title can not be empty
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        onChange={(e) => handleOnChangeInput(e.target.value, "description")}
                        value={collectionDetail.description}
                    />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose an image file</Form.Label>
                    <Form.Control type="file" onChange={(e) => { handleImageChange(e) }} isInvalid={!validImage} />
                    <Form.Control.Feedback type="invalid">
                        Please select a valid image file (PNG, JPEG, JPG).
                    </Form.Control.Feedback>
                </Form.Group>
                {imageUrl && (
                    <div className="text-center">
                        <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => { handleCloseModalUser() }} >
                    Cancel
                </Button>

                <Button variant="success" onClick={() => { handleConfirmCreateCollection() }}>
                    Create
                </Button>

            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreateCollection;
