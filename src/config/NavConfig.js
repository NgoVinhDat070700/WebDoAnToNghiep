// component
import Iconify from '@/components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/orders',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'user',
    path: '/admin/users',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'product',
    path: '/dashboard',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'category',
    path: '/admin/categories',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Blogs',
    path: '/admin/blogs',
    icon: getIcon('uil:blogger-alt'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
