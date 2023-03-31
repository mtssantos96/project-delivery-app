/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';

import style from './style.module.css';

export default function CardProduct({ id, name, price, urlImage }) {
  const { itensList, setItensList } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const currentProduct = { id, name, price, urlImage, quantity };

    let arrayProducts = [...itensList];

    arrayProducts.forEach((product, index) => {
      if (product.id === currentProduct.id) {
        arrayProducts[index] = currentProduct;
      }
    });
    const existProduct = arrayProducts.some((some) => id === some.id);
    if (quantity > 0 && !existProduct) {
      arrayProducts = [...itensList, currentProduct];
    }
    setItensList(arrayProducts);
  }, [quantity]);

  const handleChange = ({ target }) => {
    if (Number(target.value)) {
      setQuantity(Number(target.value));
    }
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity <= 0) {
      return 0;
    }
    setQuantity(quantity - 1);
  };

  return (
    <div key={ id } className={ style.cardProduct }>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        {`R$ ${price.replace('.', ',')}`}
      </p>
      <div
        className={ style.imageProduct }
      >
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ urlImage }
        />
      </div>
      <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
      <div className={ style.containerProductQuantity }>
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          onClick={ decrement }
        >
          <FaMinus />
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="number"
          placeholder="0"
          className={ style.inputProductQuantity }
          value={ Number(quantity) }
          onChange={ handleChange }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          onClick={ increment }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

CardProduct.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.string,
  urlImage: PropTypes.string,
}.required;
