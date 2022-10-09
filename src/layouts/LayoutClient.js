import Header from './header/MenuClient'
import PropTypes from 'prop-types'
import Footer from './footer'
function LayoutClient({children}){
    return (
        <div>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}
LayoutClient.propTypes = {
    children: PropTypes.node
}
export default LayoutClient