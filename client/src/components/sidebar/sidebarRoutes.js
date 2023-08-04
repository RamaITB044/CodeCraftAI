import dashboard_icon from '../../assets/icons/dashboard-icon.svg';
import credit_store from '../../assets/icons/credit-store.svg';
import my_codes from '../../assets/icons/my-files.svg';
import playground from '../../assets/icons/playground-icon.svg';


export const sidebarRoutes = [
    {
        path: '/app',
        name: 'Dashboard',
        icon: dashboard_icon
    },
    {
        path: '/app/playground',
        name: 'Playground',
        icon: playground
    },
    {
        path: '/app/my-codes',
        name: 'My Codes',
        icon: my_codes
    },
    {
        path: '/app/pricing',
        name: 'Credits',
        icon: credit_store
    },
]