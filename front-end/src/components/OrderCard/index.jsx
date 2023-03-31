import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatValue from '../../service/formatValue';

import style from './style.module.css';

export default function OrderCard(
  { pageName, id, status, saleDate, totalPrice, roleUser, addressName, addressNumber },
) {
  return (
    <Link key={ id } to={ `/${roleUser}/orders/${id}` }>
      <div className={ style.cardContainer }>
        <div className={ style.orders }>
          <p>Pedidos</p>
          <p
            data-testid={ `${roleUser}_${pageName}__element-order-id-${id}` }
          >
            { `000${id}` }
          </p>
        </div>
        <div className={ `${status} ${style.status}` }>
          <p
            data-testid={ `${roleUser}_${pageName}__element-delivery-status-${id}` }
          >
            { status }
          </p>
        </div>
        <div className={ style.datePrice }>
          <div>
            <p
              data-testid={ `${roleUser}_${pageName}__element-order-date-${id}` }
            >
              { saleDate }
            </p>
            <p
              data-testid={ `${roleUser}_${pageName}__element-card-price-${id}` }
            >
              { `R$ ${formatValue(totalPrice)}` }
            </p>
          </div>
        </div>
        { roleUser === 'seller' && (
          <p
            data-testid={ `${roleUser}_${pageName}__element-card-address-${id}` }
            aria-hidden
          >
            { `${addressName}, ${addressNumber}` }
          </p>
        )}
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  pageName: PropTypes.string,
  id: PropTypes.number,
  status: PropTypes.string,
  saleDate: PropTypes.string,
  totalPrice: PropTypes.string,
  roleUser: PropTypes.string,
  addressName: PropTypes.string,
  addressNumber: PropTypes.string,
}.required;
