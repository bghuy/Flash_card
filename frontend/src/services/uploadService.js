import axios from '../setup/axios';

const uploadCollectionPoster = async (formData) => {
    try {
        const data = await axios.post(`/uploads/images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    } catch (error) {
        throw error;
    }
}
const readCollectionPoster = async (imageName) => {
    try {
        const image = await axios.get(`/uploads/images/${imageName}`);
        return image;
    } catch (error) {
        throw error;
    }
}

export {
    uploadCollectionPoster, readCollectionPoster
}
