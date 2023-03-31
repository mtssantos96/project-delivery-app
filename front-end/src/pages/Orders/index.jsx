/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import OrderCard from '../../components/OrderCard';
import { getOrders, setToken } from '../../service/api';

import style from './style.module.css';

export default function OrderDetail() {
  const { token, role } = JSON.parse(localStorage.getItem('user'));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      const response = await getOrders();
      setOrders(response);
    };
    setToken(token);
    getAllOrders();
  }, []);

  const convertDate = (date) => {
    const newDate = new Date(Date.parse(date));
    return newDate.toLocaleDateString('pt-BR');
  };

  return (
    <div>
      <NavBar />
      <div className={ style.cardsContainer }>
        { orders.map((order) => (
          <OrderCard
            roleUser={ role }
            pageName="orders"
            key={ order.id }
            id={ order.id }
            status={ order.status }
            saleDate={ convertDate(order.saleDate) }
            totalPrice={ order.totalPrice }
            addressName={ order.deliveryAddress }
            addressNumber={ order.deliveryNumber }
          />
        )) }
      </div>
    </div>
  );
}
