import axiosInstance from './axiosInstance';

const logoutUser = async () => {
    await axiosInstance.post('/auth/logout');
};

export default logoutUser;
