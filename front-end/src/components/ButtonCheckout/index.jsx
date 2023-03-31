import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import style from './style.module.css';

export default function ButtonCheckout() {
  const navigate = useNavigate();

  const { itensList } = useContext(AuthContext);

  const totalPrice = () => {
    let total = 0;

    itensList.forEach((product) => {
      total += product.price * product.quantity;
    });

    return Math.round((total * 100)) / 100;
  };

  const handleButton = () => {
    navigate('/customer/checkout');
  };

  return (
    <div className={ style.checkoutContainer }>
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ handleButton }
        disabled={ totalPrice() === 0 }
      >
        <p className={ style.contentButtonCheckout }>
          Ver carrinho:
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            { `R$ ${totalPrice().toFixed(2).toString().replace('.', ',')}` }
          </span>
        </p>
      </button>
    </div>
  );
}
