import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { uploadCollectionPoster } from '../../../services/uploadService'
import { UserContext } from './../../../context/UserContext.js';
import { logout } from '../../../services/userService.js'
import { createCard } from '../../../services/cardService.js';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor, faFire, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from 'react-router-dom';
const ModalAnnounceResult = (props) => {
    const navigate = useNavigate()
    const { show, onHide, } = props;


    const { user, logoutContext } = useContext(UserContext);
    const handleCloseModalUser = () => {
        navigate(`/collections?email=${user.email}&page=1&limit=4`)
        onHide();
    };
    const { trueanswers, totalquestions, playagain } = props;
    const handleReplay = () => {
        onHide();
        playagain()
    }

    const trueAnswersRate = ((trueanswers / totalquestions) * 100).toFixed(2);
    const falseAnswerRate = (((totalquestions - trueanswers) / totalquestions) * 100).toFixed(2);

    let advice = "";
    if (trueAnswersRate >= 80) {
        advice = "Great job! You performed excellently.";
    } else if (trueAnswersRate >= 60) {
        advice = "Not bad! You did fairly well, but there's room for improvement.";
    } else {
        advice = "Keep practicing! You have some room for improvement.";
    }
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <div>{`Proportion of true answers = total true answers/ total questions`}</div>
            <div>{`Proportion of false answers = 100% - proportion of correct answers`}</div>
            <div>{`You got ${trueanswers}/${totalquestions} correct answer${trueanswers > 1 ? "s" : ""}`}</div>
        </Tooltip>
    );
    return (
        <Modal
            {...props}
            size="lg"
            centered
            show={show}
            onHide={handleCloseModalUser}
            bg="light"
            data-bs-theme="dark"
            style={{ color: "#fcfbfc" }}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Summary
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='progress-label mb-1 d-flex  align-items-center'>
                    <div className=''>Accuracy</div>

                    <div className='overlay-trigger'>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}

                        >
                            <FontAwesomeIcon icon={faCircleInfo} className="ms-1"></FontAwesomeIcon>
                        </OverlayTrigger>
                    </div>

                </div>
                <ProgressBar>
                    <ProgressBar striped variant="success" now={trueAnswersRate} key={1} label={`${trueAnswersRate}%`} />
                    <ProgressBar striped variant="danger" now={falseAnswerRate} key={2} label={`${falseAnswerRate}%`} />
                </ProgressBar>
                <div className='advice-area mt-3'><h5>{advice}</h5></div>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => { handleCloseModalUser() }} >
                    Quit
                </Button>

                <Button variant="success" onClick={() => { handleReplay() }}>
                    Play again
                </Button>

            </Modal.Footer>
        </Modal>
    );
}

export default ModalAnnounceResult;
