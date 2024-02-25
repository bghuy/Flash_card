import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CollectionCover from '../CollectionCover/CollectionCover';
import ReactPaginate from 'react-paginate';
import { UserContext } from '../../context/UserContext';
import { fetchMyCollection } from "./../../services/myCollectionService.js";
import { toast } from "react-toastify";

function Collections(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, searchValue } = useContext(UserContext);
    const [my_collections, setMyCollections] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(2);
    const [currentSearch, setCurrentSearch] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    const handlePageClick = async (event) => {
        const selectedPage = +event.selected + 1;
        setCurrentPage(selectedPage);
        setCurrentSearch(currentSearch)
        navigate(`/collections?email=${user.email}&page=${selectedPage}&limit=${currentLimit}&search=${currentSearch}`);
    };

    useEffect(() => {
        setCurrentSearch(prevState => '')
        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get('email') || user.email;
        const page = +queryParams.get('page') || 1;
        const limit = +queryParams.get('limit') || 3;
        const search = queryParams.get('search') || '';
        if (search) {
            setCurrentSearch(prevState => search)
        }
        setCurrentPage(prevState => page);
        const fetchCollections = async () => {
            try {
                const response = await fetchMyCollection(email, page, limit, search);
                if (response && +response.EC === 0 && response.EM && response.DT) {
                    const { totalPages, my_collection } = response.DT;
                    setTotalPages(totalPages || 0);
                    setMyCollections(my_collection || []);
                } else {
                    toast.error(response.EM);
                    setMyCollections([]);
                }
            } catch (error) {
                console.error('Error fetching collections:', error);
                toast.error('Error fetching collections');
            }
        };

        fetchCollections();
    }, [location.search, user.email, currentPage]);

    return (
        <div className='container d-flex flex-column gap-5 mt-5 flex-wrap'>
            <div className='collection-container d-flex gap-5'>
                {my_collections && my_collections.length > 0 ? (
                    my_collections.map((item) => (
                        <CollectionCover key={`collection-${item.id}`} title={item.title} description={item.description} id={item.id} />
                    ))
                ) : (
                    <h1>NOT FOUND YOUR COLLECTION</h1>
                )}
            </div>
            {totalPages > 0 && (
                <div className='user-footer'>
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
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
        </div>
    );
}

export default Collections;
