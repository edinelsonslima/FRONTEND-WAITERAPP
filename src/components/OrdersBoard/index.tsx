import { useState } from 'react';
import { toast } from 'react-toastify';

import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function OrdersBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order |null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order){
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus({ status, table, _id }: Order) {
    setIsLoading(true);

    const newStatus = status === 'WAITING'
      ? 'IN_PRODUCTION'
      : 'DONE';

    await api.patch(`/orders/${_id}`, { status: newStatus });

    toast.success(`Pedido da mesa ${table} teve o status alterado!`);

    onChangeOrderStatus(_id, newStatus);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder({ _id, table }: Order) {
    setIsLoading(true);
    await api.delete(`/orders/${_id}`);

    toast.success(`Pedido da mesa ${table} foi cancelado!`);

    onCancelOrder(_id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return(
    <Board>
      <OrderModal
        isLoading={isLoading}
        order={selectedOrder}
        visible={isModalVisible}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {!!orders.length &&(
        <OrdersContainer>
          {orders?.map((order) => (
            <button key={order._id} type='button' onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>)
      }
    </Board>
  );
}
