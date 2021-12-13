import axiosInstance from './axiosInstance';

const getLoginStatus = async () => {
    await axiosInstance.get('/auth/status');
};

export default getLoginStatus;
