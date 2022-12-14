const routesClient = {
    home:'/',
    products:'/products',
    cart:'/Cart',
    blog:'/Blogs',
    blogId:'/Blogs/:_id'
}
const routesAdmin = {
    dashboard:'/dashboard',
    products:'/admin/products',
    category:'/admin/categories',
    user:'/admin/users',
    blogs:'/admin/blogs',
    orders:'/admin/orders'

}
export {routesClient, routesAdmin}