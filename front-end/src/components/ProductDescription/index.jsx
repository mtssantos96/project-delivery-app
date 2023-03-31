import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import formatValue from '../../service/formatValue';

import style from './style.module.css';

export default function ProductDescription({ index, name, quantity, price, pageName }) {
  const { pathname } = useLocation();
  const { itensList, setItensList } = useContext(AuthContext);

  const removeProduct = () => {
    const removedProduct = itensList.filter((product) => product.name !== name);
    setItensList(removedProduct);
  };

  return (
    <tr className={ style.containerProductDescription }>
      <td
        data-testid={ `${pageName}__element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </td>
      <td
        data-testid={ `${pageName}__element-order-table-name-${index}` }
      >
        { name }
      </td>
      <td
        data-testid={ `${pageName}__element-order-table-quantity-${index}` }
      >
        { quantity }
      </td>
      <td
        data-testid={ `${pageName}__element-order-table-unit-price-${index}` }
      >
        { `R$ ${formatValue(price)}` }
      </td>
      <td
        data-testid={ `${pageName}__element-order-table-sub-total-${index}` }
      >
        { `R$ ${formatValue(price * quantity)}` }
      </td>
      { pathname === '/customer/checkout' && (
        <td>
          <button
            data-testid={ `${pageName}__element-order-table-remove-${index}` }
            type="button"
            onClick={ removeProduct }
          >
            Remover
          </button>
        </td>
      ) }
    </tr>
  );
}

ProductDescription.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.string,
  pageName: PropTypes.string,
}.required;
