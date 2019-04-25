import React from 'react'
import { Router, Route} from 'react-router-dom'

import ShopingCart from './ShopingCart'
import Products from './Products'
import PaymentInfo from './PaymentInfo'
import Footer from './Footer'
import history from '../history'
import ProductDetailModal from './ProductDetailModal';
import Navigation from './Navigation'

const App = () => {
    return (
        <React.Fragment >                        
                <Router history={history}>                     
                    <Navigation/>
                    <div>
                        <Route path="/" exact component={Products} />
                        <Route path="/shopingCart"  component={ShopingCart} />
                        <Route path="/paymentinfo"  component={PaymentInfo} />
                        <Route path="/productdetail/:id"  component={ProductDetailModal} />
                    </div>
                </Router>
           
            <Footer/>
        </React.Fragment>
    );
}

export default App;