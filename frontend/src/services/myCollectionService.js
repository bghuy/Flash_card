import axios from '../setup/axios';
const fetchMyCollection = async (email, page, limit, search, field, order, favorite) => {
    const data = await axios.get(`/my-collection/v1/read?email=${email}&page=${page}&limit=${limit}&search=${search}&field=${field}&order=${order}&favorite=${favorite}`);
    return data;
}
const deleteCollection = async (collectionId) => {
    const data = await axios.delete(`/my-collection/v1/delete`, { data: { id: collectionId } });
    return data;
}
const updateCollectionDetail = async (collectionData) => {
    const data = await axios.put(`/my-collection/v1/update`, { id: collectionData.id, title: collectionData.title, description: collectionData.description });
    return data;
}
const createCollection = async (collectionData) => {
    const data = await axios.post(`/my-collection/v1/create`, collectionData);
    return data;
}
const setFavorite = async (data) => {
    const response = await axios.post(`/my-collection/v1/set-favorite`, data);
    return response;
}

export {
    fetchMyCollection, deleteCollection, updateCollectionDetail, createCollection, setFavorite
}