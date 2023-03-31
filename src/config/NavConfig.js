// component
import Iconify from '@/components/Iconify'

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'order',
    path: '/admin/orders',
    icon: getIcon('material-symbols:list-alt-rounded'),
  },
  {
    title: 'users',
    path: '/admin/users',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'products',
    path: '/admin/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'category',
    path: '/admin/categories',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'blogs',
    path: '/admin/blogs',
    icon: getIcon('uil:blogger-alt'),
  },
]

export default navConfig
