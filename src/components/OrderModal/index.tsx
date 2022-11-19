import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';
import { Actions, ModalBody, OrderDetails, Overlay } from './styles';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  isLoading: boolean;
  onClose: () => void;
  onCancelOrder: (orderId: Order) => Promise<void>;
  onChangeOrderStatus: (order: Order) => Promise<void>;
}

export function OrderModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  onChangeOrderStatus,
  isLoading
}: OrderModalProps) {

  if(!visible || !order) return null;

  const total = order.products.reduce((acc, {product, quantity}) => {
    return acc + (product.price * quantity);
  }, 0);

  return(
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type='button' onClick={onClose}>
            <img src={closeIcon} alt="Ícone de fechar modal" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>
          <div>
            <span>
              {order.status === 'DONE' && '✅'}
              {order.status === 'WAITING' && '🕒'}
              {order.status === 'IN_PRODUCTION' && '👨🏻‍🍳'}
            </span>
            <strong>
              {order.status === 'DONE' && 'Pronto'}
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>
          <div className="order-items">

            {order.products.map(({_id, product, quantity}) => (
              <div key={_id} className="item">
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                  width={56}
                  height={28.51}
                />

                <span className="quantity">{quantity}x</span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          {order.status !== 'DONE' && (
            <button
              type='button'
              className='primary'
              disabled={isLoading}
              onClick={() => onChangeOrderStatus(order)}
            >
              <span>
                {order.status === 'WAITING' && '👨🏻‍🍳'}
                {order.status === 'IN_PRODUCTION' && '✅'}
              </span>
              <strong>
                {order.status === 'WAITING' && 'Iniciar produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir pedido'}
              </strong>
            </button>
          )}

          <button
            type='button'
            className='secondary'
            disabled={isLoading}
            onClick={() => onCancelOrder(order)}
          >
            cancelar pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
