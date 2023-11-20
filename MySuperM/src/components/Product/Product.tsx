import React, { FC } from 'react'
import './Product.scss';
interface ProductProps {
   id: number;
    name: string;
    imgSrc?: string;
    price: number;
    category: string;
    children?: React.ReactNode; 
    // Step 4: Define a prop for the callback function
  onAddToList: () => void;
  }

const Product :FC<ProductProps> = ({id,name,imgSrc,price,category,children,onAddToList }) => {
  return (
    <div className='ProductCard'>
        {/* {children} */}
        <img className='ProductCard__Img' src={imgSrc} alt={name} />
        <h1 className='ProductCard__name'>{name}</h1>
        <p className='ProductCard__price'>Price: {price}</p>
        <p className='ProductCard__category'>Category: {category}</p>
        <button className='ProductCard__button' onClick={onAddToList}>Add To List</button>
      
    </div>
  )
}

export default Product
