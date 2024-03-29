import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CollectionCover from '../CollectionCover/CollectionCover';
import ReactPaginate from 'react-paginate';
import { UserContext } from '../../context/UserContext';
import { fetchMyCollection } from "./../../services/myCollectionService.js";
import { readCollectionPoster } from '../../services/uploadService.js'
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
import "./Collections.scss"
import Form from 'react-bootstrap/Form';
import ModalCreateCollection from '../Modal/CollectionModal/ModalCreateCollection.js';
function Collections(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logoutContext } = useContext(UserContext);
    const [my_collections, setMyCollections] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(4);
    const [currentSearch, setCurrentSearch] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState({ field: 'id', order: 'DESC' });
    const [showCreateCollection, setShowCreateCollection] = useState(false);
    const handlePageClick = async (event) => {
        const selectedPage = +event.selected + 1;
        setCurrentPage(selectedPage);
        setCurrentSearch(currentSearch)
        navigate(`/collections?email=${user.email}&page=${selectedPage}&limit=${currentLimit}&search=${currentSearch}&field=${sortBy.field}&order=${sortBy.order}`);

    };
    const handleSortChange = (e) => {
        const selectedOption = e.target.value;
        const { field, order, favorite } = JSON.parse(selectedOption);
        setSortBy(prevState => ({ field, order }));
        // &search=${currentSearch}
        navigate(`/collections?email=${user.email}&page=${currentPage}&limit=${currentLimit}&field=${field}&order=${order}&favorite=${favorite ? true : false}`);
    };
    const fetchCollections = async () => {
        try {
            setCurrentSearch(prevState => '')
            const queryParams = new URLSearchParams(location.search);
            const email = queryParams.get('email') || user.email;
            const page = +queryParams.get('page') || 1;
            const limit = +queryParams.get('limit') || 4;
            const search = queryParams.get('search') || '';
            const field = queryParams.get('field') || 'id';
            const order = queryParams.get('order') || 'DESC';
            const favorite = queryParams.get('favorite') || false;
            if (search) {
                setCurrentSearch(prevState => search)
            }

            setCurrentPage(prevState => page);
            const response = await fetchMyCollection(email, page, limit, search, field, order, favorite);
            if (response && +response.EC === 0 && response.EM && response.DT) {
                const { totalPages, my_collection } = response.DT;
                setTotalPages(totalPages || 0);
                // my_collection.forEach(async (element, index) => {
                //     let name = element.imageName ? element.imageName : "createdDefaultImg.jpeg"
                //     let poster = await readCollectionPoster(name);
                //     console.log(poster);
                //     element.poster = poster; // Gán trực tiếp cho thuộc tính poster của phần tử element
                // });
                // Đợi tất cả các promise trong mảng collectionsWithFile hoàn thành
                setMyCollections(my_collection || []);

            } else {
                toast.error(response.EM);
                setMyCollections([]);
            }
        } catch (error) {
            // console.log('Error fetching collections:', error);
            logoutContext();
            navigate("/login")
            // toast.error('Error fetching collections');

        }
    };
    const onHideModalCreateCollection = () => {
        setShowCreateCollection(false);
    }
    const showModalCreateCollection = () => {
        setShowCreateCollection(true);
    }
    useEffect(() => {
        fetchCollections();
        // setReload(prevState => false)
    }, [location.search, user.email, currentPage]);

    return (
        <Container className=' d-flex flex-column gap-5 mt-5 flex-wrap '>
            <Navbar expand="lg" className="bg-body-tertiary ">
                <Container className='d-flex justify-content-between'>
                    <Nav>
                        <Button variant="outline-success" className='add-circle-btn' onClick={() => { showModalCreateCollection() }}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </Nav>

                    <Nav>
                        <Form.Select aria-label="Default select example" onChange={(e) => handleSortChange(e)}>
                            <option value={JSON.stringify({ "field": "id", "order": "DESC" })}>Latest</option>
                            <option value={JSON.stringify({ "field": "title", "order": "DESC" })}>Descending title</option>
                            <option value={JSON.stringify({ "field": "title", "order": "ASC" })}>Ascending title</option>
                            <option value={JSON.stringify({ "field": "id", "order": "DESC", "favorite": true })}>Favorite</option>
                        </Form.Select>
                    </Nav>


                </Container>
            </Navbar>
            <div className='collection-container d-flex gap-5 justify-content-start flex-wrap'>
                {my_collections && my_collections.length > 0 ? (
                    my_collections.map((item) => (
                        <CollectionCover
                            key={`collection-${item.id}`}
                            title={item.title}
                            description={item.description}
                            id={item.id}
                            fetchCollections={fetchCollections}
                            imageName={item.imageName || "createdDefaultImg.jpeg"}
                            favorite={item.favorite}
                            reload={fetchCollections}
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
            <ModalCreateCollection
                show={showCreateCollection}
                onHide={onHideModalCreateCollection}
                reload={fetchCollections}
            />
        </Container>
    );
}

export default Collections;
