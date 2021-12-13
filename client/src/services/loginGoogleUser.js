import axiosInstance from './axiosInstance';

const loginGoogleUser = async (code) => {
    await axiosInstance.post('/auth/google/login', { code });
};

export default loginGoogleUser;
