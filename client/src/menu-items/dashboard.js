// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// ==============================|| DASHBOARD MENU ITEMS ||============================== //
const Commie = 'Community Centre';
const Bookie = 'Booker';
const dashboard = {
    id: 'dashboard',
    title: ` ${Commie}  
             ${Bookie}`,
    type: 'group',
    children: [
        { id: 'Explore', title: 'User Profile', type: 'item', url: '/dashboard/default', icon: ArrowForwardIosIcon, breadcrumbs: false },
        {
            id: 'Slot Booking',
            title: 'Slot Booking',
            type: 'item',
            url: '',
            target: true,
            icon: ArrowForwardIosIcon,
            breadcrumbs: false
        },
        {
            id: 'Pending Approvals',
            title: 'Pending Approvals',
            type: 'item',
            url: '',
            target: true,
            icon: ArrowForwardIosIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
