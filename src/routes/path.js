// Đây là nơi định nghĩa các router chạy trên Web

import Home from "@/pages/clients/Home"
import Products from "@/pages/clients/Products"
import config from "@/config/index"
import LayoutClient from "@/layouts/LayoutClient"
import Dashboard from "@/pages/admin/Dashboard"
import LayoutAdmin from "@/layouts/LayoutAdmin"
import Category from "@/pages/admin/Category"
import User from "@/pages/admin/Users"
import Cart from "@/pages/clients/Cart"
import Order from "@/pages/admin/Order"
import Blog from "@/pages/clients/Blog"
import BlogAdmin from "@/pages/admin/Blog"
import BlogDetail from "@/pages/clients/Blog/BlogDetail"

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
        path:config.routesAdmin.blogs,component:BlogAdmin,layout:LayoutAdmin
    },
]

const routerPublic = [
    {
        path:config.routesClient.home,component:Home,layout:LayoutClient,
    },
    {
        path:config.routesClient.products,component:Products,layout:LayoutClient
    },
    {
        path:config.routesClient.cart,component:Cart,layout:LayoutClient
    },
    {
        path:config.routesClient.blog,component:Blog,layout:LayoutClient
    },
    {
        path:config.routesClient.blogId,component:BlogDetail,layout:LayoutClient
    }
]
export {routerPublic, routersAdmin} 
