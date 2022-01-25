import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import Loader from '../../../ui-component/Loader';
import loginGoogleUser from '../../../services/loginGoogleUser';

const OAuthRedirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const code = searchParams.get('code');

    useEffect(() => {
        loginGoogleUser(code)
            .then(() => {
                navigate('/free/pages/login/login3');
            })
            .catch((err) => {
                console.error('Error found while trying to send code');
                console.error(err);
                navigate('/free/pages/login/login3');
            });
    }, [code, navigate]);

    return <Loader />;
};

export default OAuthRedirect;
