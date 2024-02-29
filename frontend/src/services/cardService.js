import axios from '../setup/axios';
const fetchListCards = async (queryField) => {
    const data = await axios.get(`/card/v1/read?collectionId=${queryField.collectionId}&page=${queryField.page}&limit=${queryField.limit}&search=${queryField.search}&field=${queryField.field}&order=${queryField.order}`);
    return data;
}
const deleteCard = async (cardId) => {
    const data = await axios.delete(`/card/v1/delete`, { data: { id: +cardId } });
    return data;
}
const createCard = async (cardData) => {
    const data = await axios.post(`/card/v1/create`, cardData);
    return data;
}
export { fetchListCards, deleteCard, createCard }