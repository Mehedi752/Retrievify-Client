import axios from 'axios';

export const axiosPublic = axios.create({
    baseURL: 'https://retrievify-server.onrender.com',
});
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;