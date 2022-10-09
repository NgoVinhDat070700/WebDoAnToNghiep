import {routesClient, routesAdmin} from './routes'
const config = {
    routesClient:routesClient,
    routesAdmin:routesAdmin
}
export default config

export const DOMAIN_SERVER_API = 'http://localhost:5000/api/'

export const rowsPerPageOptions = [5,10,15]
export const defaultPagination = rowsPerPageOptions[0]

export const URL_IMAGE = 'http://localhost:5000/uploads'

