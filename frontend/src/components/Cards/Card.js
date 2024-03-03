import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CollectionCover from '../CollectionCover/CollectionCover';
import ReactPaginate from 'react-paginate';
import { UserContext } from '../../context/UserContext';
import { fetchMyCollection } from "./../../services/myCollectionService.js";
import { fetchListCards } from '../../services/cardService.js'
import { toast } from "react-toastify";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faPlus } from '@fortawesome/free-solid-svg-icons'
import "./Card.scss"
import Form from 'react-bootstrap/Form';
import ModalCreateCard from '../Modal/CardModal/ModalCreateCard.js';
import ModalCreateCollection from '../Modal/CollectionModal/ModalCreateCollection.js';
import CardCover from '../CardCover/CardCover.js';

function Cards(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logoutContext } = useContext(UserContext);
    const [card_list, setCardList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(4);
    const [currentSearch, setCurrentSearch] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState({ field: 'id', order: 'DESC' });
    const [showCreateCard, setShowCreateCard] = useState(false);
    const [cId, setCId] = useState(null)
    const handlePageClick = async (event) => {
        const selectedPage = +event.selected + 1;
        setCurrentPage(selectedPage);
        setCurrentSearch(currentSearch)
        navigate(`/flashcards?cId=${cId}&page=${selectedPage}&limit=${currentLimit}&search=${currentSearch}&field=${sortBy.field}&order=${sortBy.order}`);
    };
    const handleSortChange = (e) => {
        const selectedOption = e.target.value;
        const { field, order } = JSON.parse(selectedOption);
        setSortBy(prevState => ({ field: field, order: order }));
        // &search=${currentSearch}
        navigate(`/flashcards?cId=${cId}&page=${currentPage}&limit=${currentLimit}&field=${field}&order=${order}`);
    };
    const fetchCards = async () => {
        try {
            setCurrentSearch(prevState => '')
            const queryParams = new URLSearchParams(location.search);
            const collectionId = queryParams.get('cId') || null;
            const page = +queryParams.get('page') || 1;
            const limit = +queryParams.get('limit') || 4;
            const search = queryParams.get('search') || '';
            const field = queryParams.get('field') || 'id';
            const order = queryParams.get('order') || 'DESC';
            if (search) {
                setCurrentSearch(prevState => search)
            }

            setCurrentPage(prevState => page);
            setCId(() => +collectionId)
            console.log("set all")
            if (collectionId) {
                console.log('pass')
                const queryField = {
                    collectionId: collectionId,
                    page: page,
                    limit: limit,
                    search: search,
                    field: field,
                    order: order,
                    email: user.email
                }
                const response = await fetchListCards(queryField);
                if (response && +response.EC === 0 && response.EM && response.DT) {
                    const { totalPages, card_list } = response.DT;
                    setTotalPages(totalPages || 0);
                    setCardList(card_list || []);

                } else {
                    toast.error(response.EM);
                    setCardList([]);
                }
            }
            else {
                toast.error("collection doesn't match");
                navigate(`/notFound`)
            }
        } catch (error) {

            // logoutContext();
            // navigate("/login")
            // toast.error('Error fetching collections');

        }
    };
    const onHideModalCreateCard = () => {
        setShowCreateCard(false);
    }
    const showModalCreateCard = () => {
        setShowCreateCard(true);
    }
    useEffect(() => {
        fetchCards();
        // setReload(prevState => false)
    }, [location.search, currentPage]);

    return (
        <Container className=' d-flex flex-column gap-5 mt-5 flex-wrap '>
            <Navbar expand="lg" className="bg-body-tertiary ">
                <Container className='d-flex justify-content-between'>
                    <Nav>
                        <Button variant="outline-success" className='add-circle-btn' onClick={() => { showModalCreateCard() }}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </Nav>

                    <Nav>
                        <Form.Select aria-label="Default select example" onChange={(e) => handleSortChange(e)}>
                            <option value={JSON.stringify({ "field": "id", "order": "DESC" })}>Latest</option>
                            <option value={JSON.stringify({ "field": "title", "order": "DESC" })}>Descending title</option>
                            <option value={JSON.stringify({ "field": "title", "order": "ASC" })}>Ascending title</option>
                        </Form.Select>
                    </Nav>


                </Container>
            </Navbar>
            <div className='collection-container d-flex gap-5 justify-content-start flex-wrap'>
                {card_list && card_list.length > 0 ? (
                    card_list.map((item) => (
                        <CardCover
                            key={`card-${item.id}`}
                            title={item.title}
                            description={item.description}
                            id={item.id}
                            collectionId={item.collectionId}
                            fetchCardList={fetchCards}
                            imageName={item.imageName || "createdDefaultImg.jpeg"}
                            favorite={item.favorite}
                        />
                    ))
                ) : (
                    <h1>No collection found</h1>
                )}
            </div>
            {totalPages > 0 && (
                <div className='user-footer'>
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={4}
                        marginPagesDisplayed={2}
                        pageCount={totalPages}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={currentPage - 1}
                    />
                </div>

            )}
            <ModalCreateCard
                show={showCreateCard}
                onHide={onHideModalCreateCard}
                reload={fetchCards}
                cId={cId}
            />

        </Container>
    );
}

export default Cards;
