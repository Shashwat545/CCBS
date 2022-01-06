import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// profile page routing
const FormPage = Loadable(lazy(() => import('../views/dashboard/Default/Form')));

// ==============================|| PROFILE PAGE ROUTING ||============================== //

const FormPageRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/pages/form-registration',
            element: <FormPage />
        }
    ]
};

export default FormPageRoutes;
