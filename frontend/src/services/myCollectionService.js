import axios from '../setup/axios';
const fetchMyCollection = async (email, page, limit, search, field, order, favorite) => {
    const response = await axios.get(`/my-collection/v1/read?email=${email}&page=${page}&limit=${limit}&search=${search}&field=${field}&order=${order}&favorite=${favorite}`);
    return response;
}
const deleteCollection = async (data) => {
    const response = await axios.delete(`/my-collection/v1/delete`, { data: { id: +data.id, email: data.email } });
    return response;
}
const updateCollectionDetail = async (data) => {
    const response = await axios.put(`/my-collection/v1/update`, { id: data.id, title: data.title, description: data.description, email: data.email });
    return response;
}
const createCollection = async (data) => {
    const response = await axios.post(`/my-collection/v1/create`, { title: data.title, description: data.description, email: data.email });
    return response;
}
const setFavorite = async (data) => {
    const response = await axios.post(`/my-collection/v1/set-favorite`, { id: data.id, favorite: data.favorite, email: data.email });
    return response;
}

export {
    fetchMyCollection, deleteCollection, updateCollectionDetail, createCollection, setFavorite
}