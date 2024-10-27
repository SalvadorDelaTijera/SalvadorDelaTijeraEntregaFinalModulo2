export default class GetCartItemDTO {
  static cleanOne(document) {
    return {
      product: document.product,
      quantity: document.quantity,
      salesPrice: document.salesPrice,
      subtotal: document.subtotal,
    }
  }

  static cleanMany(documents) {
    return documents.map((document) => GetCartItemDTO.cleanOne(document));
  }
}
