import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { fetchAll } from '../../services/cardService';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import "./Practice.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor, faFire } from '@fortawesome/free-solid-svg-icons'
import ModalAnnounceResult from '../Modal/CardModal/ModalAnounceResult';
const Practice = (props) => {
    const [timeLeft, setTimeLeft] = useState(20);
    const [start, setStart] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [cardList, setCardList] = useState([]);
    const [question, setQuestion] = useState({})
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [answers, setAnswers] = useState([])
    const [collectionId, setCollectionId] = useState(null);
    const [trueAnswers, setTrueAnswers] = useState(0);
    const [userAnswer, setUserAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const onHideShowResult = () => {
        setShowResult(false);
    }
    const { user } = useContext(UserContext);
    const navigate = useNavigate()
    const location = useLocation();
    const onClickStart = () => {
        setStart(true);
    }
    const getRandomIndex = () => {
        const index = Math.floor(Math.random() * cardList.length);
        if (selectedIndices.includes(index)) {
            return getRandomIndex(); // Nếu đã chọn rồi, chọn lại ngẫu nhiên
        }
        return index;
    }
    const onClickReset = async () => {
        setStart(false);
        setTimeLeft(10);
        setCurrentQuestion(1);
        setUserAnswer("");
        setQuestion({});
        setTrueAnswers(0);
        setSelectedIndices([]);
        setAnswers([])
        await fetchAllCard();
    }
    const getRandomAnswers = (index) => {
        const tempCardList = [...cardList];// Tạo một bản sao của mảng cardList để không ảnh hưởng đến mảng gốc
        const currentQuestionTitle = cardList[index].title; // Lấy title của câu hỏi hiện tại

        // Loại bỏ câu hỏi hiện tại khỏi danh sách câu trả lời
        const filteredCardList = tempCardList.filter((card) => card.title !== currentQuestionTitle);

        // Tạo mảng chứa các câu trả lời ngẫu nhiên không trùng nhau
        const randomAnswers = [];
        while (randomAnswers.length < 3) {
            const randomIndex = Math.floor(Math.random() * filteredCardList.length);
            const randomAnswer = filteredCardList[randomIndex].title;
            if (!randomAnswers.includes(randomAnswer)) {
                randomAnswers.push(randomAnswer);
            }
        }

        // Thêm câu hỏi hiện tại vào mảng câu trả lời
        randomAnswers.push(currentQuestionTitle);

        // Trộn ngẫu nhiên mảng câu trả lời
        randomAnswers.sort(() => Math.random() - 0.5);

        return randomAnswers;
    };
    const goNextQuestion = () => {
        if (userAnswer !== null) {
            if (userAnswer === question.title) {
                toast.success("correct answer", { autoClose: 500 })
                setTrueAnswers((prevState) => (prevState + 1));
            }
            else {
                toast.error("incorrect answer", { autoClose: 500 })
                setTrueAnswers((prevState) => (prevState));
            }
            if (currentQuestion < cardList.length) {
                setTimeLeft(20);
                setCurrentQuestion((currentQuestion) => currentQuestion + 1);
                const index = getRandomIndex();
                setQuestion(() => cardList[index]);
                setSelectedIndices([...selectedIndices, index]);
                const questionAnswers = getRandomAnswers(index);
                setAnswers(questionAnswers);
                setUserAnswer(() => null)
            }
            else {
                setTimeLeft(0);
                setShowResult(true);
                setUserAnswer(() => null)
            }
        }
        else {
            if (timeLeft > 0) {
                toast.error("please choose an answer", { autoClose: 1000 })
            }
            else {
                if (currentQuestion < cardList.length) {
                    setTimeLeft(20);
                    setCurrentQuestion((currentQuestion) => currentQuestion + 1);
                    const index = getRandomIndex();
                    setQuestion(() => cardList[index]);
                    setSelectedIndices([...selectedIndices, index]);
                    const questionAnswers = getRandomAnswers(index);
                    setAnswers(questionAnswers);
                }
                else {
                    setTimeLeft(0);
                    setShowResult(true);
                }
            }

        }



    };
    const fetchAllCard = async () => {
        let data = { id: collectionId, email: user.email }
        if (collectionId) {
            const response = await fetchAll(data);
            if (response && response.EM && +response.EC === 0 && response.DT) {
                setCardList(() => response.DT);
            }
            else {
                toast.error(response.EM);
                // navigate(`/collections?email=${user.email}&page=1&limit=4`)
            }
        }
        else {
            toast.error("cId null")
        }

    }
    const handleRadioChange = (event) => {
        setUserAnswer(() => event.target.value);
    };
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const newCollectionId = queryParams.get('collectionId') || null;
        if (newCollectionId) {
            setCollectionId(() => (newCollectionId ? +newCollectionId : null));
        }
    }, [location.search]);

    useEffect(() => {
        if (collectionId !== null) {
            fetchAllCard();
        }
    }, [collectionId]);
    useEffect(() => {
        const updateSelectedIndices = async () => {
            if (cardList.length > 0) {
                const index = getRandomIndex();
                await setSelectedIndices((prevState) => ([...prevState, ...selectedIndices, index]));
            }
        };

        updateSelectedIndices(); // Gọi hàm cập nhật state

    }, [cardList]);

    // useEffect để theo dõi sự thay đổi của selectedIndices và thực hiện các thao tác tiếp theo
    useEffect(() => {
        if (selectedIndices.length > 0) {
            const index = selectedIndices[selectedIndices.length - 1]; // Lấy index mới nhất
            const questionAnswers = getRandomAnswers(index);
            setAnswers(() => questionAnswers);
            setQuestion(() => cardList[index]);
        }
    }, [selectedIndices]);

    useEffect(() => {
        if (answers.length > 0 && question) {

        }
    }, [answers, question])

    useEffect(() => {
        if (start) {
            const timer = setTimeout(() => {
                if (timeLeft > 0) {
                    setTimeLeft(timeLeft => timeLeft - 1);
                }
                else {
                    goNextQuestion();
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft, start, userAnswer]);
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (

        <div className='practice-container  px-5 pt-5'  >
            {
                !start ?
                    <div className='start-announce '>
                        <Button variant="danger" onClick={(e) => { onClickStart() }} >
                            <h1><FontAwesomeIcon icon={faMeteor}> </FontAwesomeIcon></h1>
                            <h1>Start</h1>
                        </Button>

                    </div>
                    :
                    <>
                        <div className='practice-header d-flex mb-3'>
                            <div className='current-question me-2 p-3'>{`${currentQuestion}/${cardList.length}`}</div>
                            <div className='clock mx-2 p-3'>
                                <span>Time left: </span>
                                <span>{hours < 10 ? `0${hours}` : hours}</span>:
                                <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
                                <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
                            </div>
                            <div className='true-number-show p-3 mx-2'><FontAwesomeIcon icon={faFire}></FontAwesomeIcon>{` ${trueAnswers}/${cardList.length}`}</div>
                        </div>
                        <div className='practice-main d-flex p-5'>
                            <div className='left-practice d-flex justify-content-center align-items-center p-5'>
                                <div className='question-field'><h4>{question ? question.description : ""}</h4></div>
                            </div>
                            <div className='right-practice d-flex justify-content-center align-items-center p-5'>
                                <Form className='answer-area'>
                                    <div className='answer-field'>
                                        {answers.length > 0 && answers.map((item, index) => (
                                            <div key={`default-${index}`} className="row ">
                                                <div className=" radio-answer">
                                                    <Form.Check
                                                        type="radio"
                                                        id={`default-radio-${index}`}
                                                        label={item}
                                                        name={`answer-${currentQuestion}`} // Thay đổi tên cho mỗi câu hỏi
                                                        value={item}
                                                        onChange={(e) => handleRadioChange(e)}
                                                        key={`radio-${currentQuestion}-${index}`} // Thêm một khóa duy nhất
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </Form>
                            </div>
                        </div>
                        <div className='practice-footer d-flex justify-content-end mt-3'>
                            <div className='practice-footer-left'>

                            </div>
                            <div className='practice-footer-right'>
                                {start && +currentQuestion === cardList.length &&
                                    <Button variant="danger" onClick={(e) => { onClickReset() }} className='me-2'>Again</Button>
                                }
                                {
                                    start && +currentQuestion <= cardList.length &&
                                    <Button variant="success" onClick={(e) => { goNextQuestion() }} >Submit</Button>
                                }
                            </div>


                        </div>
                    </>

            }
            <ModalAnnounceResult
                show={showResult}
                onHide={onHideShowResult}
                trueanswers={+trueAnswers}
                totalquestions={+cardList.length}
                playagain={onClickReset}

            />
        </div>


    );
};

export default Practice;
