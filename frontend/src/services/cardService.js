import axios from '../setup/axios';
const fetchListCards = async (data) => {
    const response = await axios.get(`/card/v1/read?email=${data.email}&collectionId=${data.collectionId}&page=${data.page}&limit=${data.limit}&search=${data.search}&field=${data.field}&order=${data.order}`);
    return response;
}
const deleteCard = async (cardData) => {
    const response = await axios.delete(`/card/v1/delete`, { data: { id: +cardData.id, email: cardData.email } });
    return response;
}
const createCard = async (data) => {
    const response = await axios.post(`/card/v1/create`, { title: data.title, description: data.description, collectionId: data.collectionId, email: data.email });
    return response;
}
const fetchAll = async (data) => {
    const response = await axios.get(`/card/v1/read?email=${data.email}&collectionId=${data.id}`);
    return response;
}
export { fetchListCards, deleteCard, createCard, fetchAll }