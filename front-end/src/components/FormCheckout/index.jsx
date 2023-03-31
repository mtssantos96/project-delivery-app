/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AuthContext from '../../context/AuthContext';
import { checkout, getSellers } from '../../service/api';
import style from './style.module.css';

export default function FormCheckout() {
  const { itensList } = useContext(AuthContext);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useNavigate();
  const [sellers, setSellers] = useState([]);

  const [inputValues, setInputValues] = useState({
    sellerId: '',
    address: '',
    number: '',
  });

  const validForm = async () => {
    const schemaForm = Yup.object().shape({
      sellerId: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.string().required(),
    });

    try {
      await schemaForm.validate(inputValues);
      setButtonDisabled(false);
    } catch (error) {
      setButtonDisabled(true);
    }
  };

  const handleOnChange = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { sellerId, address, number } = inputValues;
    const res = await checkout({ items: itensList,
      sellerId,
      deliveryAddress: address,
      deliveryNumber: number });
    router(`/customer/orders/${res.id}`);
  };

  useEffect(() => {
    validForm();
  }, [inputValues]);

  useEffect(() => {
    async function getAllSellers() {
      const listSellers = await getSellers();
      setSellers(listSellers);
      setInputValues({ ...inputValues, sellerId: listSellers[0].id });
    }
    getAllSellers();
  }, []);

  return (
    <div className={ style.formCheckout }>
      <h3>Detalhes e Endereço para Entrega</h3>
      <form onSubmit={ handleSubmit }>
        <select
          data-testid="customer_checkout__select-seller"
          value={ inputValues.sellerId }
          name="sellerId"
          onChange={ handleOnChange }
        >
          { sellers.map((seller) => (
            <option
              key={ seller.id }
              name="sellerId"
              value={ seller.id }
            >
              { seller.name }
            </option>
          )) }
        </select>
        <input
          data-testid="customer_checkout__input-address"
          type="text"
          name="address"
          onChange={ handleOnChange }
          placeholder="Endereço"
        />
        <input
          data-testid="customer_checkout__input-address-number"
          type="numer"
          name="number"
          onChange={ handleOnChange }
          placeholder="Número"
        />
        <button
          disabled={ buttonDisabled }
          type="submit"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
}
