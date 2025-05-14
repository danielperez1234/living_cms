// Tipos basados en la respuesta de tu API
export interface ApiProductBought {
  productsBoughtId: string;
  purchaseDetailId: string;
  productId: string;
  price: number;
  quantity: number;
}

export interface ApiPurchaseDetail {
  purchaseDetailId: string;
  purchaseHistoryId: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  products: ApiProductBought[];
}

export interface ApiPurchaseHistory {
  purchaseHistoryId: string;
  userId: string;
  amount: number;
  status: OrderStatus; // Ej: "Cancel", "completed"
  purchaseDetail: ApiPurchaseDetail;
  createdAt?: string;
}

export interface GetPurchaseHistoryResponse {
  elementos: number;
  purchaseHistories: ApiPurchaseHistory[];
}

// Tipos internos que usará la UI (con el status mapeado y createdAt asegurado)
export const ORDER_STATUSES = [
  "Pedido Recibido",
  "Pago Confirmado",
  "En Preparación",
  "Enviado",
  "Entregado",
  "Cancelado",
  "Reembolso en Proceso",
] as const;

export type OrderStatus = typeof ORDER_STATUSES[number];

export const ORDER_STATUS_DESCRIPTIONS: Record<OrderStatus, string> = {
  "Pedido Recibido": "Tu orden ha sido registrada con éxito. Estamos verificando los detalles de tu compra.",
  "Pago Confirmado": "Hemos recibido tu pago y estamos preparando tu pedido.",
  "En Preparación": "Tu pedido está siendo procesado y empaquetado para su envío.",
  "Enviado": "Tu pedido ha salido de nuestro almacén y está en camino. Te enviaremos un número de rastreo.",
  "Entregado": "Tu pedido ha sido recibido en la dirección proporcionada.",
  "Cancelado": "Tu pedido ha sido cancelado. Si tienes dudas, contáctanos.",
  "Reembolso en Proceso": "Estamos gestionando tu reembolso. Te notificaremos cuando se complete."
};

