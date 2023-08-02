import dashboard_icon from '../../assets/icons/dashboard-icon.svg';
import credit_store from '../../assets/icons/credit-store.svg';
import my_codes from '../../assets/icons/my-files.svg';
import playground from '../../assets/icons/playground-icon.svg';


export const sidebarRoutes = [
    {
        path: '/',
        name: 'Dashboard',
        icon: dashboard_icon
    },
    {
        path: '/playground',
        name: 'Playground',
        icon: playground
    },
    {
        path: '/my-codes',
        name: 'My Codes',
        icon: my_codes
    },
    {
        path: '/credit-store',
        name: 'Credits',
        icon: credit_store
    },
]