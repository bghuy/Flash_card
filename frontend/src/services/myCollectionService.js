import axios from '../setup/axios';
const fetchMyCollection = async (email, page, limit, search, field, order) => {
    const data = await axios.get(`/my-collection/v1/read?email=${email}&page=${page}&limit=${limit}&search=${search}&field=${field}&order=${order}`);
    return data;
}
const deleteCollection = async (collectionId) => {
    const data = await axios.delete(`/my-collection/v1/delete`, { data: { id: collectionId } });
    return data;
}

export {
    fetchMyCollection, deleteCollection
}