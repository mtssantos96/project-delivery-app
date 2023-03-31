import { useContext } from 'react';
import ButtonCheckout from '../../components/ButtonCheckout';
import CardProduct from '../../components/CardProduct';
import NavBar from '../../components/NavBar';
import AuthContext from '../../context/AuthContext';

import style from './style.module.css';

export default function Products() {
  const { productsData } = useContext(AuthContext);

  return (
    <div>
      <NavBar />
      <div className={ style.containerHeader }>
        <ButtonCheckout />
      </div>
      <div className={ style.containerProducts }>
        { productsData.map((product) => (
          <CardProduct
            key={ product.id }
            id={ product.id }
            product={ product }
            name={ product.name }
            price={ product.price }
            urlImage={ product.url_image }
          />
        )) }
      </div>
    </div>
  );
}
