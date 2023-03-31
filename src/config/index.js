import { routesClient, routesAdmin } from './routes'
const config = {
  routesClient: routesClient,
  routesAdmin: routesAdmin,
}
export default config

export const DOMAIN_SERVER_API = 'https://fetchfood-api.onrender.com/api/'

export const rowsPerPageOptions = [5, 10]
export const defaultPagination = rowsPerPageOptions[0]

export const URL_IMAGE = 'https://fetchfood-api.onrender.com/uploads'

export const dateFormat = 'DD-MM-YYYY'

export const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/ic_flag_en.svg',
  },
  {
    value: 'vn',
    label: 'VietNam',
    icon: '/static/icons/ic_flag_vn.svg',
  },
]

export const defaultLang = LANGS[0]

export const CONSTANT = {
  ORDER_STATUSES: [
    {
      value: 'PROCESSING',
      name: 'Đơn đang được xử lý',
    },
    {
      value: 'CANCELLING',
      name: 'Đang hủy đơn',
    },
    {
      value: 'PACKED',
      name: 'Đã đóng gói',
    },
    {
      value: 'DELIVERING',
      name: 'Đang giao hàng',
    },
    {
      value: 'DELIVERED',
      name: 'Đã giao hàng',
    },
    {
      value: 'CANCELLED',
      name: 'Đã hủy',
    },
  ],
}
