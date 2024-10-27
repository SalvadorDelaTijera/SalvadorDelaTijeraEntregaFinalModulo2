export default class GetCartDTO {
  static cleanOne(document) {
    return {
      id: document._id,
      items: document.items,
      total: document.total,
    }
  }

  static cleanMany(documents) {
    return documents.map((document) => GetCartDTO.cleanOne(document));
  }
}
