import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { uploadCollectionPoster } from '../../../services/uploadService'
import { UserContext } from './../../../context/UserContext.js';
const ModalAddPoster = (props) => {
    const { show, onHide, reload } = props;
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [validImage, setValidImage] = useState(true);
    const { user } = useContext(UserContext);
    const handleCloseModalUser = () => {
        setImageFile(null);
        setImageUrl(null);
        setValidImage(true);
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

    const handleConfirmUpdate = async () => {
        try {
            if (imageFile) {
                const formData = new FormData();
                formData.append('collectionId', props.collectionid);
                formData.append('file', imageFile);
                const response = await uploadCollectionPoster(formData);
                if (response && +response.EC === 0 && response.EM) {
                    toast.success(response.EM);

                } else {
                    toast.error(response.EM);
                }
                console.log("Uploading image:", imageFile);
                setImageFile(null);
                setImageUrl(null);
                setValidImage(true);
                await reload();
                onHide();
            } else {
                toast.error("Please select an image file.");

            }
        } catch (error) {
            console.log(error);
        }

    };

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
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose an image file</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} isInvalid={!validImage} />
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
                <Button variant="danger" onClick={handleCloseModalUser} >
                    Cancel
                </Button>
                {imageFile && validImage && (
                    <Button variant="success" onClick={handleConfirmUpdate}>
                        Upload Image
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddPoster;
