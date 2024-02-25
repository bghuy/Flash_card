import axios from '../setup/axios';
const fetchMyCollection = async (email, page, limit, search) => {
    const data = await axios.get(`/my-collection/v1/read?email=${email}&page=${page}&limit=${limit}&search=${search}`);
    return data;
}
export {
    fetchMyCollection
}