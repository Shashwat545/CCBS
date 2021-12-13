import axiosInstance from './axiosInstance';

const getCodeChallenge = async () => {
    const res = await axiosInstance.get('/auth/google/challenge');
    return res.data;
};

export default getCodeChallenge;
