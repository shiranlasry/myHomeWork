import React, { useState } from 'react';
import Product from './components/Product/Product';
import './App.scss';
import { products as initialProducts } from './util/products';

interface Product_interface {
  id: number;
  name: string;
  imgSrc?: string;
  price: number;
  category: string;
  count?: number;
}

function App() {
  const [selectedProducts, setSelectedProducts] = useState<Product_interface[]>([]);
  const [products, setProducts] = useState<Product_interface[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Product_interface>({
    id: 0,
    name: '',
    imgSrc: '',
    price: 0,
    category: '',
  });

  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);
  const addToProductList = (product: Product_interface) => {
    //check if product is already in the list
    const productExists = selectedProducts.find((p) => p.id === product.id);
    if (productExists) {
      const updatedProducts = [...selectedProducts];
      const productIndex = selectedProducts.findIndex((p) => p.id === product.id);
      updatedProducts[productIndex].count! += 1;
      setSelectedProducts(updatedProducts);
      return;
    } else {
      product.count = 1;
    setSelectedProducts([...selectedProducts, product]);}
  };

  const removeFromProductList = (index: number) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  };

  const handleAddNewClick = () => {
    setShowAddProductForm(true);
  };

  const handleAddProduct = () => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    addToProductList(newProduct);
    setNewProduct({
      id: 0,
      name: '',
      imgSrc: '',
      price: 0,
      category: '',
    });
    setShowAddProductForm(false);
  };

  const handleCancelAddProduct = () => {
    setNewProduct({
      id: 0,
      name: '',
      imgSrc: '',
      price: 0,
      category: '',
    });
    setShowAddProductForm(false);
  };

  return (
    <div className="App">
      <div className='productsList-container'>
        <h1>My List aaaaa</h1>
        <ul className='productsList'>
          {selectedProducts.map((product, index) => (
            <li key={product.id}>
              <p>{product.name}</p>
              <p> {product.count}</p>
              <button onClick={() => removeFromProductList(index)}>X</button>
            </li>
          ))}
        </ul>
      </div>

      <div className='products-Container'>
        <div className='products-header'>
          <h1>Products</h1>
          <input
            type='text' placeholder='Search products...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <button className='products-header__button' onClick={handleAddNewClick}>
            Add New
          </button>
          {/* add search to products */}

        </div>

        <div className='products'>
          {filteredProducts.map((product) => (
            <Product
              key={product.id}
              imgSrc={product.imgSrc}
              name={product.name}
              price={product.price}
              id={product.id}
              category={product.category}
              onAddToList={() => addToProductList(product)}
            />
          ))}
        </div>
      </div>

      {showAddProductForm && (
        <div className='add-product-form'>
          <h2>Add New Product</h2>
          <label>
            Name:
            <input
              type='text'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </label>
          <label>
            Image URL:
            <input
              type='text'
              value={newProduct.imgSrc}
              onChange={(e) => setNewProduct({ ...newProduct, imgSrc: e.target.value })}
            />
          </label>
          <label>
            Price:
            <input
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            />
          </label>
          <label>
            Category:
            <input
              type='text'
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
          </label>
          <button onClick={handleAddProduct}>Add Product</button>
          <button onClick={handleCancelAddProduct}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
