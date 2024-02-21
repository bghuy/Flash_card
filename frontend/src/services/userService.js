// import axios from 'axios';
import axios from '../setup/axios';
const registerNewUser = async (userData) => {
    const data = await axios.post('/user/v1/register', { ...userData });
    return data;
}
const login = async (loginData) => {
    const data = await axios.post('/user/v1/login', loginData);
    return data;
}
const fetchAllUsers = async (page, limit) => {
    const data = await axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
    return data;
}
const fetchUser = async (email) => {
    const data = await axios.get(`/user/v1/read?email=${email}`);
    return data;
}
const deleteUser = async (user) => {
    const data = await axios.delete(`/api/v1/user/delete`, { data: { id: user.id } });
    return data;
}
const updateUserPW = async (updateData) => {
    const data = await axios.put(`/user/v1/updatePassword`, updateData);
    return data;
}
const getUserAccount = async () => {
    const data = await axios.get(`/user/v1/account`);
    return data;
}
const logout = async () => {
    const data = await axios.post('/user/v1/logout');
    return data;
}
export { registerNewUser, login, fetchAllUsers, deleteUser, updateUserPW, getUserAccount, logout, fetchUser };