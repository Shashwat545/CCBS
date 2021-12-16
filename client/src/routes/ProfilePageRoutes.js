import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// profile page routing
const ProfilePage = Loadable(lazy(() => import('views/profile-page/index')));

// ==============================|| PROFILE PAGE ROUTING ||============================== //

const ProfilePageRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/pages/profile-page',
            element: <ProfilePage />
        }
    ]
};

export default ProfilePageRoutes;
