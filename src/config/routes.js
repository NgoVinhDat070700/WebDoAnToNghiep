const routesClient = {
    home:'/',
    products:'/products',
    cart:'/Cart',
    blog:'/Blogs',
    blogId:'/Blogs/:_id',
    verifiCation:'/verification/*'
}
const routesAdmin = {
    dashboard:'/admin/dashboard',
    products:'/admin/products',
    category:'/admin/categories',
    user:'/admin/users',
    blogs:'/admin/blogs',
    orders:'/admin/orders',
    pageNotFound:'*'

}
export {routesClient, routesAdmin}