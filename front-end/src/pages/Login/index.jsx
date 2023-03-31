/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AuthContext from '../../context/AuthContext';
import Logo from './Logo.svg';
import style from './style.module.css';

const minLengthPassword = 6;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  const [isDisabledButtonLogin, setIsDisabledButtonLogin] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const { loginUser } = useContext(AuthContext);

  const validateInput = async () => {
    const schemaLogin = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(minLengthPassword).required(),
    });

    try {
      await schemaLogin.validate(inputValues);
      setIsDisabledButtonLogin(false);
    } catch (error) {
      setIsDisabledButtonLogin(true);
    }
  };

  const handleOnChange = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const redirectByRole = (role) => {
    switch (role) {
    case 'seller':
      navigate('/seller/orders');
      break;
    case 'administrator':
      navigate('/admin/manage');
      break;
    default:
      navigate('/customer/products');
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      redirectByRole(JSON.parse(user).role);
    }
  }, []);

  const performLogin = async () => {
    const data = await loginUser(inputValues);

    console.log(data);

    if (data.token) {
      redirectByRole(data.role);
    } else {
      setErrorMessage(data.message);
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/login');
    }
  }, []);

  useEffect(
    () => {
      validateInput();
    },
    [inputValues],
  );

  return (
    <div className={ style.container }>
      <div className={ style.logo }>
        <img
          src={ Logo }
          alt="logo svg"
        />
        <h1>COPO CHEIO</h1>
        <p>DIRETO NA SUA CASA</p>
      </div>
      <form onSubmit={ handleSubmit }>
        <div>
          <input
            data-testid="common_login__input-email"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={ inputValues.email }
            onChange={ handleOnChange }
          />
        </div>
        <div>
          <input
            data-testid="common_login__input-password"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={ inputValues.password }
            onChange={ handleOnChange }
          />
        </div>
        { errorMessage && (
          <h3 data-testid="common_login__element-invalid-email">{ errorMessage }</h3>
        ) }
        <button
          data-testid="common_login__button-login"
          disabled={ isDisabledButtonLogin }
          type="submit"
          onClick={ performLogin }
        >
          Login
        </button>
        <Link to="/register">
          <button
            data-testid="common_login__button-register"
            type="button"
          >
            Ainda não tenho conta
          </button>
        </Link>
      </form>
    </div>
  );
}
