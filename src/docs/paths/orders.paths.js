import { ORDER_STATUS_VALUES } from "../../constants/index.js";
import { errorResponse, successResponse, idParameter, schemaRef, responseRef } from "../helpers.js";
import { invalidIdExample, invalidStatusExample } from "../examples.js";

const TAG = "Orders";

export const ordersPaths = {
  "/api/orders": {
    get: {
      tags: [TAG],
      summary: "Listar pedidos",
      description:
        "Devuelve los pedidos, los más nuevos primero. Se pueden filtrar por estado con `?status=`. Los pedidos se pueden generar con `POST /api/mocks/seed?type=orders`.",
      operationId: "getOrders",
      parameters: [
        {
          name: "status",
          in: "query",
          required: false,
          description: "Devuelve solo los pedidos con este estado",
          schema: { type: "string", enum: [...ORDER_STATUS_VALUES], example: "pending" }
        }
      ],
      responses: {
        200: successResponse("Lista de pedidos", { type: "array", items: schemaRef("Order") }),
        400: errorResponse("El estado indicado no existe", invalidStatusExample("shipped", ORDER_STATUS_VALUES)),
        500: responseRef("InternalError")
      }
    }
  },

  "/api/orders/{id}": {
    get: {
      tags: [TAG],
      summary: "Obtener un pedido por id",
      operationId: "getOrderById",
      parameters: [idParameter("pedido")],
      responses: {
        200: successResponse("El pedido", schemaRef("Order")),
        400: errorResponse("El id no tiene formato de MongoDB", invalidIdExample("pedido")),
        404: responseRef("OrderNotFound"),
        500: responseRef("InternalError")
      }
    }
  }
};
