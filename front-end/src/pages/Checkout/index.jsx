import { useContext, useState } from 'react';
import FormCheckout from '../../components/FormCheckout';
import NavBar from '../../components/NavBar';
import ProductDescription from '../../components/ProductDescription';
import AuthContext from '../../context/AuthContext';
import formatValue from '../../service/formatValue';

import style from './style.module.css';

export default function Checkout() {
  const { itensList } = useContext(AuthContext);
  const [headers] = useState(
    ['Item', 'Descrição', 'Quantidade', 'Valor unitário', 'Sub-total', 'Remover Item'],
  );

  const totalValue = () => {
    const initialValue = 0;
    const sum = itensList
      .reduce((accumulator, currentValue) => accumulator + (
        currentValue.price * currentValue.quantity), initialValue);
    return formatValue(sum);
  };

  return (
    <div className={ style.container }>
      <NavBar />
      <div className={ style.containerTableCheckout }>
        <h1>Finalizar pedido</h1>
        <table>
          <thead>
            <tr>
              { headers.map((header, index) => <th key={ index }>{ header }</th>) }
            </tr>
          </thead>
          <tbody>
            { itensList.map((product, index) => (
              <ProductDescription
                key={ product.id }
                index={ index }
                name={ product.name }
                quantity={ product.quantity }
                price={ product.price }
                pageName="customer_checkout"
              />
            )) }
          </tbody>
        </table>
        <div className={ style.totalPrice }>
          <h3 data-testid="customer_checkout__element-order-total-price">
            Total:
            {' '}
            { `R$ ${totalValue()}` }
          </h3>
        </div>
        <div>
          <FormCheckout />
        </div>
      </div>

    </div>
  );
}
