import React, { Component } from 'react'
import Product from '../components/Product/Product'

export default class Products extends Component {
    render() {
        return (
            <div className="col">
                <div className="row">
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </div>
            </div>
        )
    }
}
