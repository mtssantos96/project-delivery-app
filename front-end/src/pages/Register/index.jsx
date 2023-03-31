/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AuthContext from '../../context/AuthContext';

import style from './style.module.css';

const minLengthPassword = 6;
const minLengthName = 12;

export default function Register() {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isDisabledButtonRegister, setIsDisabledButtonRegister] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  const { registerUser } = useContext(AuthContext);

  const validateInput = async () => {
    const schemaRegister = Yup.object().shape({
      name: Yup.string().min(minLengthName).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(minLengthPassword).required(),
    });

    try {
      await schemaRegister.validate(inputValues);
      setIsDisabledButtonRegister(false);
    } catch (error) {
      setIsDisabledButtonRegister(true);
    }
  };

  const handleOnChange = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const performRegister = async () => {
    const data = await registerUser(inputValues);

    if (data.token) {
      navigate('/customer/products');
    } else {
      setErrorMessage(data.message);
    }
  };

  useEffect(
    () => {
      validateInput();
    },
    [inputValues],
  );

  return (
    <div className={ style.container }>
      <form onSubmit={ handleSubmit }>
        <div>
          <input
            data-testid="common_register__input-name"
            id="name"
            name="name"
            type="text"
            placeholder="Seu nome"
            value={ inputValues.name }
            onChange={ handleOnChange }
          />
        </div>
        <div>
          <input
            data-testid="common_register__input-email"
            id="email"
            name="email"
            type="text"
            placeholder="email@email.com"
            value={ inputValues.email }
            onChange={ handleOnChange }
          />
        </div>
        <div>
          <input
            data-testid="common_register__input-password"
            id="password"
            name="password"
            type="password"
            placeholder="**********"
            value={ inputValues.password }
            onChange={ handleOnChange }
          />
        </div>
        { errorMessage && (
          <h3
            data-testid="common_register__element-invalid_register"
          >
            { errorMessage }
          </h3>
        ) }
        <button
          data-testid="common_register__button-register"
          disabled={ isDisabledButtonRegister }
          type="submit"
          onClick={ performRegister }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
