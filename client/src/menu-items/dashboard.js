// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
const Commie = 'Community Centre';
const Bookie = 'Booking System';
const dashboard = {
    id: 'dashboard',
    title: ` ${Commie}  
             ${Bookie}`,
    type: 'group',
    children: [
        {
            id: 'Explore',
            title: 'Page no. 1',
            type: 'collapse',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false,
            children: [
                {
                    id: 'Page no. 2',
                    title: 'Page no. 2',
                    type: 'item',
                    url: '',
                    target: true
                },
                {
                    id: 'Page no. 3',
                    title: 'Page no. 3',
                    type: 'item',
                    url: '',
                    target: true
                },
                {
                    id: 'Page no. 4',
                    title: 'Page no. 4',
                    type: 'item',
                    url: '',
                    target: true
                }
            ]
        }
    ]
};

export default dashboard;
