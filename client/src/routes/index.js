import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import ProfilePageRoutes from './ProfilePageRoutes';
import config from 'config';
import FormRouter from './RouteForm';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, FormRouter, AuthenticationRoutes, ProfilePageRoutes], config.basename);
}
