/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, login, register, setToken } from '../service/api';

const DEFAULT_VALUES = {
  registerUser: async () => {},
  loginUser: async () => {},
  logoutUser: async () => {},
  userData: {
    token: '',
    email: '',
    name: '',
    role: '',
  },
  setUserData: () => {},

  productsData: [],
  itensList: [],
  setItensList: () => {},
};

const AuthContext = createContext(DEFAULT_VALUES);

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(DEFAULT_VALUES.userData);
  const [productsData, setProductsData] = useState(DEFAULT_VALUES.productsData);
  const [itensList, setItensList] = useState(DEFAULT_VALUES.itensList);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await getProducts();

    setProductsData(response);
  };

  const saveCartOnLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(itensList));
  };

  const registerUser = async (data) => {
    const user = await register(data);

    setUserData(user);

    localStorage.setItem('user', JSON.stringify(user));

    return user;
  };

  const loginUser = async (data) => {
    const user = await login(data);

    setUserData(user);

    localStorage.setItem('user', JSON.stringify(user));

    return user;
  };

  const logoutUser = async () => {
    localStorage.clear();

    setUserData({
      token: '',
      email: '',
      name: '',
      role: '',
    });

    navigate('login');
  };

  useEffect(() => {
    saveCartOnLocalStorage();
  }, [itensList]);

  useEffect(() => {
    setToken(userData.token);
  }, [userData]);

  useEffect(() => {
    fetchProducts();

    const data = localStorage.getItem('user');

    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const value = useMemo(() => ({
    registerUser,
    loginUser,
    logoutUser,
    userData,
    setUserData,

    productsData,
    itensList,
    setItensList,
  }), [userData, productsData, itensList]);

  return (
    <AuthContext.Provider value={ value }>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
