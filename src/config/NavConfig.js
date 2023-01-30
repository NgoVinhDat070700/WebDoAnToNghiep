// component
import Iconify from '@/components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Bảng điều khiển',
    path: '/admin/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Hóa đơn',
    path: '/admin/orders',
    icon: getIcon('material-symbols:list-alt-rounded'),
  },
  {
    title: 'Người dùng',
    path: '/admin/users',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Sản phẩm',
    path: '/admin/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Loại sản phẩm',
    path: '/admin/categories',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Blog hướng dẫn',
    path: '/admin/blogs',
    icon: getIcon('uil:blogger-alt'),
  },
];

export default navConfig;
