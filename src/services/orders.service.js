import ordersRepository from "../repositories/orders.repository.js";
import { ORDER_STATUS_VALUES } from "../constants/index.js";
import { InvalidIdError, InvalidStatusError, OrderNotFoundError } from "../errors/index.js";
import { isValidId } from "../utils/validators.js";

// El Service tiene la lógica de negocio: validaciones y reglas.
// No conoce Express (req/res) ni Mongoose: habla con el Repository.
// Cuando algo está mal, lanza un error del dominio (carpeta errors/); no responde nada él mismo.

// status (opcional): filtra los pedidos por estado
export const getOrders = async (status) => {
  if (status !== undefined && !ORDER_STATUS_VALUES.includes(status)) {
    throw new InvalidStatusError(status, ORDER_STATUS_VALUES);
  }

  return await ordersRepository.getAll({ status });
};

export const getOrderById = async (id) => {
  if (!isValidId(id)) {
    throw new InvalidIdError("pedido");
  }

  const order = await ordersRepository.getById(id);
  if (!order) {
    throw new OrderNotFoundError();
  }
  return order;
};
