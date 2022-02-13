import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import OAuthRedirect from '../views/pages/authentication/OAuthRedirect';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login3',
            element: <AuthLogin3 />
        },

        {
            path: 'oauth/redirect',
            element: <OAuthRedirect />
        }
    ]
};

export default AuthenticationRoutes;
