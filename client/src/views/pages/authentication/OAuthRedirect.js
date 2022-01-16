import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import Loader from '../../../ui-component/Loader';
import loginGoogleUser from '../../../services/loginGoogleUser';

const OAuthRedirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const code = searchParams.get('code');
    const hd = searchParams.get('hd');

    useEffect(() => {
        // Check for the 'hd' value
        if (hd !== 'iitbbs.ac.in') {
            console.error("Incorrect value for 'hd'");
            navigate('/free/pages/login/login3');
        } else {
            loginGoogleUser(code)
                .then(() => {
                    navigate('/free');
                })
                .catch((err) => {
                    console.error('Error found while trying to send code');
                    console.error(err);
                    navigate('/free/pages/login/login3');
                });
        }
    }, [code, hd, navigate]);

    return <Loader />;
};

export default OAuthRedirect;
