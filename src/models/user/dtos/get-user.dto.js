/* eslint-disable no-unused-vars */
import { Document } from "mongoose";
import User from "../user.model.js";

export default class GetUserDTO {
  /**
   * 
   * @param {Document<User>} document Un documento de MongoDB basado en el modelo
   * User (usuario).
   * @returns {Object} Un objeto JSON limpio (sin datos sensibles).
   */
  static cleanOne(document) {
    return {
      id: document._id,
      email: document.email,
      firstName: document.firstName,
      lastName: document.lastName,
      roles: document.roles,
    }
  }

  /**
   * Filtra o elimina atributos con información sensible, o sin utilidad,
   * que contiene un arreglo de documentos de usuario dentro de la
   * colección de MongoDB (contraseña, deleted, createdAt, updatedAt,
   * deletedAt)
   * 
   * @param {Document<User>[]} documents Un arreglo de documentos de
   * MongoDB basados en el modelo User (usuario).
   * @returns {Object[]} un arreglo de documentos con los atributos de
   * usuario filtrados.
   */
  static cleanMany(documents) {
    return documents.map((document) => GetUserDTO.cleanOne(document));
  }
}