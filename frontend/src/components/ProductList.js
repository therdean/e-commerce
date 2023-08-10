import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BACKEND_URL from '../environments';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        fetch(BACKEND_URL + '/product.php', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setProducts(data.products));
    }, []);

    const handleCheckboxChange = (productSKU, isChecked) => {
        setSelectedProducts(prevSelectedProducts => {
            if (isChecked) {
                return [...prevSelectedProducts, productSKU];
            } else {
                return prevSelectedProducts.filter(selectedSKU => selectedSKU !== productSKU);
            }
        });
    };

    const handleMassDelete = () => {
        const requestData = { action: 'DELETE', productIds: selectedProducts };

        fetch(BACKEND_URL + '/product.php', {
            method: 'POST',
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setProducts(products.filter(product => !selectedProducts.includes(product.SKU)));
                    setSelectedProducts([]);
                } else {
                    console.error(data.error);
                }
            })
            .catch(error => console.error(error));
    };


    return (
        <div className='product-list-page'>
            <div className='product-list-heading'>
                <h2>Product List</h2>
                <div className="list-btns">
                    <Link to={'/add-product'}>
                        <button className='button-cta'>
                            ADD
                        </button>
                    </Link>
                    <button className='button-cta' id='delete-product-btn' onClick={handleMassDelete}>MASS DELETE</button>
                </div>
            </div>
            <hr className='horizontal-line' />
            <ul className='product-cards-wrapper'>
                {products.map((product, i) => (
                    <li key={i}>
                        <div className='product-card'>
                            <input onChange={e => handleCheckboxChange(product.SKU, e.target.checked)} className='delete-checkbox' type="checkbox" />
                            <p>{product.SKU}</p>
                            <p>{product.name}</p>
                            <p>{product.price} $</p>
                            {product.size && <p>Size: {product.size} MB</p>}
                            {product.dimensions && <p style={{ whiteSpace: 'nowrap' }}>Dimensions: {product.dimensions}</p>}
                            {product.weight && <p>Weight: {product.weight} KG</p>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
