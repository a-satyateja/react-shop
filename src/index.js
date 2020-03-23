import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/Home';
import AuthProvider from './contexts/AuthContext'
import WishListProvider from './contexts/WishListContext';
import ProductProvider from './contexts/ProductContext';
import { Provider } from 'react-redux'
import store from './redux/store'


ReactDOM.render(
    <Provider store={store}>
        <AuthProvider>
            <ProductProvider>
                <WishListProvider>
                    <Home />
                </WishListProvider>
            </ProductProvider>
        </AuthProvider>
    </Provider>
, document.getElementById('root'));

