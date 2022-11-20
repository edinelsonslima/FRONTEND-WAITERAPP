import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { api } from '../../utils/api';
import { Order } from '../../types/Order';
import { OrdersBoard } from '../OrdersBoard';

import { Container } from './styles';

interface OrdersReduce {
  done: Order[];
  waiting: Order[];
  inProduction: Order[];
}

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  function handleCancelOrder(orderId: string) {
    setOrders(orders.filter((order) => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders(prevState => {
      const orderIndex = prevState.findIndex(({ _id }) => _id === orderId);
      const newOrders = [...prevState];
      newOrders[orderIndex].status = status;
      return newOrders;
    });
  }

  const { done, inProduction, waiting } = orders
    .reduce<OrdersReduce>(({ done, inProduction, waiting }, order) => {
      (order.status === 'DONE') && done.push(order);
      (order.status === 'WAITING') && waiting.push(order);
      (order.status === 'IN_PRODUCTION') &&  inProduction.push(order);

      return { done, inProduction, waiting };
    }, { waiting: [], inProduction: [], done: [] });


  useEffect(() => {
    const socket = socketIo(import.meta.env.VITE_APP_URL_API, {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order: Order) => {
      setOrders(prevState => [...prevState, order]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/orders');
      setOrders(data);
    })();
  }, []);

  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />

      <OrdersBoard
        icon="👨🏻‍🍳"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />

      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  );
}

