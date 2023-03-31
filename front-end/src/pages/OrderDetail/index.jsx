/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import ProductDescription from '../../components/ProductDescription';
import AuthContext from '../../context/AuthContext';
import { getOrdersDetails, setStatus, setToken } from '../../service/api';

import style from './style.module.css';

const Four = 4;

export default function OrderDetail({ pageName }) {
  const { id } = useParams();
  const [ordersDetails, setOdersDetails] = useState({});
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrdersDetails = async () => {
      const details = await getOrdersDetails(id);
      setOdersDetails(details);
    };
    const data = localStorage.getItem('user');
    if (data) {
      setToken(JSON.parse(data).token);
    }
    fetchOrdersDetails();
  }, [userData]);

  const handleStatus = async (status) => {
    const order = await setStatus(id, status);
    setOdersDetails(order);
  };

  return (
    <div>
      <NavBar />
      {ordersDetails.id && (
        <div className={ style.orderContainer }>
          <h3>Detalhes do pedido</h3>
          <div className={ style.orderDetails }>
            <p className={ style.orderStatus }>
              <span data-testid={ `${pageName}__element-order-details-label-order-id` }>
                PEDIDO:
                {' '}
                {String(ordersDetails.id).padStart(Four, '0')}
              </span>
              <span
                data-testid={ `${pageName}__element${
                  '-'}order-details-label-delivery-status-${ordersDetails.id}` }
                className={ ordersDetails.status }
              >
                {ordersDetails.status}

              </span>
            </p>
            <p
              data-testid={ `${pageName}__element-order-details-label-seller-name` }
            >
              P. Vend:
              {' '}
              {ordersDetails.seller.name}
            </p>
            <p
              data-testid={ `${pageName}__element-order-details-label-order-date` }
            >
              Data do pedido
              {' '}
              {(new Date(ordersDetails.saleDate)).toLocaleDateString('pt-BR')}

            </p>
          </div>
          {pageName.includes('seller') ? (
            <>
              <button
                data-testid={ `${pageName}__button-preparing-check` }
                type="button"
                disabled={ ordersDetails.status !== 'Pendente' }
                onClick={ () => handleStatus('Preparando') }
              >
                Preparar Pedido
              </button>
              <button
                data-testid={ `${pageName}__button-dispatch-check` }
                type="button"
                disabled={ ordersDetails.status !== 'Preparando' }
                onClick={ () => handleStatus('Em Trânsito') }
              >
                Saiu para entrega
              </button>
            </>
          ) : (
            <button
              data-testid={ `${pageName}__button-delivery-check` }
              type="button"
              disabled={ ordersDetails.status !== 'Em Trânsito' }
              onClick={ () => handleStatus('Entregue') }
            >
              Marcar como entregue
            </button>
          )}
          <table>
            <tbody>
              {ordersDetails.products
                .map(({
                  id: productId,
                  name,
                  price,
                  SaleProduct: { quantity },
                }, index) => (
                  <ProductDescription
                    index={ index }
                    key={ productId }
                    name={ name }
                    price={ price }
                    quantity={ quantity }
                    pageName={ pageName }
                  />
                ))}
            </tbody>
          </table>
          <h3
            data-testid={ `${pageName}__element-order-total-price` }
          >
            {`R$ ${ordersDetails.totalPrice.replace('.', ',')}`}
          </h3>
        </div>
      )}
    </div>
  );
}

OrderDetail.propTypes = {
  pageName: PropTypes.string,
}.required;
