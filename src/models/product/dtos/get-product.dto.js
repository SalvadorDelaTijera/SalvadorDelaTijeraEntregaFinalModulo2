export default class GetProductDTO {
  static cleanOne(document) {
    return {
      id: document._id,
      code: document.code,
      title: document.title,
      description: document.description,
      price: document.price,
      stock: document.stock,
      status: document.status,
      thumbnails: document.thumbnails,
    }
  }

  static cleanMany(documents) {
    return documents.map((document) => GetProductDTO.cleanOne(document));
  }
}
