import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT || 'http://localhost:3001',
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const getProducts = async () => {
  const res = await api.get('/products');

  return res.data;
};

export const login = async (body) => {
  try {
    const res = await api.post('/login', body);

    return res.data;
  } catch (err) {
    console.warn(err);

    return err.response.data;
  }
};

export const register = async (body) => {
  try {
    const res = await api.post('/register', body);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getSellers = async () => {
  const res = await api.get('/sellers');

  return res.data;
};

export const checkout = async (info) => {
  const res = await api.post('/checkout', {
    items: info.items,
    sellerId: Number(info.sellerId),
    deliveryAddress: info.deliveryAddress,
    deliveryNumber: info.deliveryNumber,
  });
  return res.data;
};

export const getOrders = async () => {
  const res = await api.get('/orders');

  return res.data;
};

export const getOrdersDetails = async (id) => {
  const res = await api.get(`/orders/${id}`);

  return res.data;
};

export const setStatus = async (id, status) => {
  const res = await api.put(`/orders/${id}/status`, {
    status,
  });

  return res.data;
};

export const createUser = async (userData) => {
  const res = await api.post('/admin/user', {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role,
  });
  return res.data;
};

export const listUser = async () => {
  const res = await api.get('/admin/user');
  return res.data;
};

export const deleteUser = async (id) => {
  await api.delete(`/admin/user/${id}`, {
    id,
  });
};
export default api;
