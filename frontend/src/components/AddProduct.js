import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BACKEND_URL from '../environments';

const AddProduct = () => {
    const [sku, setSku] = useState(null);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [size, setSize] = useState(null);
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const [length, setLength] = useState(null);
    const [weight, setWeight] = useState(null);

    const [productType, setProductType] = useState(null);

    const attributes = {
        furniture: "Please, provide dimensions",
        book: "Please, provide weight",
        dvd: "Please, provide size"
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!sku || !name || !price || !productType) {
            alert('Please, submit required data');
            return;
        }

        if (productType === 'DVD' && (!size || isNaN(size))) {
            alert('Please, provide the data of indicated type');
            return;
        }
        if (productType === 'Book' && (!weight || isNaN(weight))) {
            alert('Please, provide the data of indicated type');
            return;
        }
        if (productType === 'Furniture' && (!height || !width || !length || isNaN(height) || isNaN(width) || isNaN(length))) {
            alert('Please, provide the data of indicated type');
            return;
        }

        let setDimensions = null;
        if (width && height && length) setDimensions = `${width}x${height}x${length}`;

        const product = { sku, name, price, size, setDimensions, weight };
        fetch(BACKEND_URL + '/product.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/';
                } else {
                    alert('Error: ' + data.error);
                }
            });
    };

    return (
        <div className='product-add-page'>
            <div className='product-add-heading'>
                <h2>Product Add</h2>
                <div className='add-btns'>
                    <button className='button-cta' onClick={handleSubmit}>Save</button>
                    <button className='button-cta'>
                        <Link to="/">CANCEL</Link>
                    </button>
                </div>
            </div>
            <hr className='horizontal-line' />
            <form id='product_form' className='add-form'>
                <div className='add-fields'>
                    <label>
                        SKU
                    </label>
                    <input id='sku' type="text" onChange={e => setSku(e.target.value)} />
                </div>

                <div className='add-fields'>
                    <label>
                        Name
                    </label>
                    <input id='name' type="text" onChange={e => setName(e.target.value)} />
                </div>

                <div className='add-fields'>
                    <label>
                        Price ($)
                    </label>
                    <input id='price' type="number" onChange={e => setPrice(e.target.value)} />
                </div>

                <div className='add-fields'>
                    <label htmlFor="productType">
                        Type Switcher
                    </label>

                    <select onChange={e => setProductType(e.target.value)} name="productType" id="productType">
                        <option value="none">Type Switcher</option>
                        <option value="DVD">DVD</option>
                        <option value="Book">Book</option>
                        <option value="Furniture">Furniture</option>
                    </select>
                </div>

                <div>
                    {productType === 'DVD' ? (
                        <div className='book-type-wrapper'>
                            <label htmlFor="size">Size (MB)</label>
                            <input id='size' type="number" onChange={(e) => setSize(e.target.value)} placeholder='#size' />
                        </div>
                    ) : ''}
                    {productType === 'Book' ? (
                        <div className='book-type-wrapper'>
                            <label htmlFor="size">Weight (KG)</label>
                            <input id='weight' type="number" onChange={(e) => setWeight(e.target.value)} placeholder='#weight' />
                        </div>
                    ) : ''}
                    {productType === 'Furniture' ? (
                        <div className='book-type-wrapper column'>
                            <div className='book-type-fields'>
                                <label htmlFor="size">Height (CM)</label>
                                <input id='height' onChange={(e) => setHeight(e.target.value)} type="number" placeholder='#height' />
                            </div>
                            <div className='book-type-fields'>
                                <label htmlFor="size">Width (CM)</label>
                                <input id='width' onChange={(e) => setWidth(e.target.value)} type="number" placeholder='#width' />
                            </div>
                            <div className='book-type-fields'>
                                <label htmlFor="size">Length (CM)</label>
                                <input id='length' onChange={(e) => setLength(e.target.value)} type="number" placeholder='#length' />
                            </div>
                        </div>
                    ) : ''}
                </div>
                <span>{attributes[productType?.toLowerCase()]}</span>
            </form>



        </div>
    );
};

export default AddProduct;
