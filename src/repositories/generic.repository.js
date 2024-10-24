/* eslint-disable no-unused-vars */
import { Document, Model } from "mongoose";

export default class RepositoryFactory {
  // Los campos privados de una clase deben ser declarados
  // primero.
  #model;
  
  /**
   * Devuelve una instancia de un repositorio para acceder a
   * una colección de MongoDB.
   * 
   * @param {Model} model El modelo que se inyecta al repositorio.
   */
  constructor(model) {
    this.#model = model;
  }

  /**
   * Devuelve una colección de documentos de MongoDB que,
   * opcionalmente, cumplen con una consulta y su cantidad está
   * delimitada por las propiedades `limit` y `offset` pasadas
   * a través del objeto `options`.
   * 
   * @param {Object} query Una consulta en el formato de MongoDB.
   * @param {Object} options Un objeto conteniendo los parámetros
   * limit y offset para el paginado.
   * @returns {Promise<Document[]>} Una colección de documentos
   * de MongoDB que cumplen con la consulta y las opciones pasadas.
   */
  async findMany(query, options) {
    const queryWithoutDeleted = { ...query, deleted: false };
    try {
      return await this.#model.paginate(queryWithoutDeleted, options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Busca y devuelve un documento, dentro de una colección de MongoDB,
   * identificado por su `id`.
   * 
   * @param {string} id El valor del campo `id` del documento que
   * se desea recuperar.
   * @returns {Promise<Document>} Un documento de MongoDB cuyo `id`
   * coincide con el valor del parámero pasado.
   */
  async findOneById(id) {
    try {
      return await this.#model.findOne({ _id: id, deleted: false });
    } catch (error) {
      throw new error(error.message);
    }
  }

  /**
   * Crea y devuelve un nuevo documento dentro de una colección
   * de MongoDB.
   * 
   * @param {Object} createDto Un objeto que contiene todas las
   * propiedades, y sus valores, necesarias para crear un nuevo
   * documento dentro de una colección de MongoDB.
   * @returns {Promise<Document>} El documento recién creado.
   */
  async create(createDto) {
    try {
      return await this.#model.create(createDto);
    } catch (error) {
      throw new error(error.message);
    }
  }

  /**
   * Busca y, si lo encuentra, modifica un documento dentro de
   * una colección de MongoDB. Busca el documento por su `id`.
   * Si lo encuentra modifica sólo aquellas propiedades que
   * son pasadas en el objeto updateDto.
   * 
   * @param {string} id El valor del campo `id` del documento
   * que se desea modificar.
   * @param {Object} updateDto Un objeto con las propiedades,
   * y sus valores, que se desean modificar en el documento
   * original.
   * @returns {Promise<Document>} El documento recién modificado.
   */
  async update(id, updateDto) {
    try {
          return await this.#model.findOneAndUpdate(
            {
              _id: id,
              deleted: false,
            },
            updateDto
          );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Busca y, si lo encuentra, borra un documento dentro de una
   * colección de MongoDB. El documento es identificado de manera
   * única por su `id`.
   * 
   * @param {string} id El valor del campo `id` del documento
   * que se desea eliminar.
   * @returns {Promise<Document>} El documento recién borrado.
   */
  async remove(id) {
    try {
      return await this.#model.findOneAndDelete({ _id: id }, { returnDocument: "before" });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
