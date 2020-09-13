import React from 'react';
import './ProductTable.css'

const ProductTable = (props) => {

    const { products, editProduct, deleteProduct, categories } = props;
  
    return (
        products.length > 0 ? (
            products.map(product => (
                <div className="tableContainer">
                    <div className="imageContainer">
                        <img className="productImage" src={product.images} alt="Product"></img>
                    </div>
                    <div className="nameContainer">
                        <span className="productName">{product.name}</span>
                    </div>
                    <div className="priceContainer">
                        <span>$ {product.precio}</span>
                    </div>
                    <div className="stockContainer">
                        <span>{product.stock} u.</span>
                    </div>
                    <div className="buttonContainer">
                        <button className = 'buttonEdit' onClick = {e => editProduct(product)}>Edit</button> {'  '}
                        <button className = 'buttonDelete' onClick = {e => deleteProduct(product.idProduct)}>Delete</button>
                    </div>
                </div>
            ))
        ) : (
            <span>No Products</span>
        )
    )
}

export default ProductTable;