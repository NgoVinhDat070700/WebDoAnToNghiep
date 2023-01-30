// Đây là nơi định nghĩa các router chạy trên Web


import config from "@/config/index"
import Dashboard from "@/pages/admin/Dashboard"
import LayoutAdmin from "@/layouts/LayoutAdmin"
import Category from "@/pages/admin/Category"
import User from "@/pages/admin/Users"
import Order from "@/pages/admin/Order"
import BlogAdmin from "@/pages/admin/Blog"
import Products from "@/pages/admin/Products"
import Page404 from "@/pages/Page404"

const routersAdmin = [
    {
        path:config.routesAdmin.dashboard,component:Dashboard,layout:LayoutAdmin
    },
    {
        path:config.routesAdmin.category,component:Category,layout:LayoutAdmin
    },
    {
        path:config.routesAdmin.user,component:User,layout:LayoutAdmin
    },
    {
        path:config.routesAdmin.orders,component:Order,layout:LayoutAdmin
    },
    {
        path:config.routesAdmin.products,component:Products,layout:LayoutAdmin
    },
    {
        path:config.routesAdmin.blogs,component:BlogAdmin,layout:LayoutAdmin
    },
    {
        path:config.routesAdmin.pageNotFound,component:Page404
    }
]

// const routerPublic = [
//     {
//         path:config.routesClient.home,component:Home,layout:LayoutClient,
//     },
//     {
//         path:config.routesClient.products,component:Products,layout:LayoutClient
//     },
//     {
//         path:config.routesClient.cart,component:Cart,layout:LayoutClient
//     },
//     {
//         path:config.routesClient.blog,component:Blog,layout:LayoutClient
//     },
//     {
//         path:config.routesClient.blogId,component:BlogDetail,layout:LayoutClient
//     },
//     {
//         path:config.routesClient.verifiCation,component:VerificationPage,layout:LayoutClient
//     }
// ]
export {routersAdmin} 
