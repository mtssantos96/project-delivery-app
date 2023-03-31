import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

import style from './style.module.css';

export default function NavBar() {
  const { role } = JSON.parse(localStorage.getItem('user'));
  const { logoutUser, userData } = useContext(AuthContext);

  const { pathname } = useLocation();

  const renderNavBarCustomer = () => (
    <div className={ style.containerNavbar }>
      { role === 'customer' && (
        <Link
          data-testid="customer_products__element-navbar-link-products"
          to="/customer/products"
          style={ { display: 'contents' } }
        >
          <button
            type="button"
            className={
              pathname.includes('products')
                ? 'selected'
                : ''
            }
          >
            Produtos

          </button>
        </Link>
      ) }
      <Link
        data-testid="customer_products__element-navbar-link-orders"
        to={ `/${role}/orders` }
        style={ { display: 'contents' } }
      >
        <button
          type="button"
          className={
            pathname.includes('orders')
              ? 'selected'
              : ''
          }
        >
          Meus pedidos

        </button>
      </Link>
      <p
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { userData.name }
      </p>
      <Link
        className={ style.logoutButton }
        data-testid="customer_products__element-navbar-link-logout"
        to="/login"
        style={ { display: 'contents' } }
      >
        <button
          className={ style.logoutButton }
          type="button"
          onClick={ logoutUser }
        >
          Sair
        </button>
      </Link>
    </div>
  );

  return (renderNavBarCustomer());
}
