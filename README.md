# Curso Backend, Módulo 2, Coderhouse

## Entrega del Proyecto Final

Mejorando la arquitectura del Servidor.

### Objetivos Generales

Profesionalizar el servidor desarrollado en la primera preentrega.

### Objetivos Específicos

- Aplicar una arquitectura profesional para neustro servidor.
- Aplicar práctias como patrones de diseño, mailing, variables de
  entorno, etc.

### Se debe entregar

- Modificar nuestra capa de persistencia para aplicar los conceptos DAO y DTO.
- Implementar el patrón _Repository_ para trabajar con el _DAO_ en la
  lógica de negocio.
- Modificar la ruta `/current` para evitar enviar información sensible, enviar
  un _DTO_ del **usuario** sólo con la información necesaria.
- Realizar un _middleware_ que pueda trabajar en conjunto con la estrategia
  _"current"_ para hacer un sistema de autorización y delimitar el acceso a
  dichos _enpoints_:
    - Sólo el **administrador** puede crear, actualizar y eliminar
      **productos**.
    - Sólo el **usuario** puede agregar **productos** a su propio
      **carrito**.
- Crear un _modelo_ **Ticket** el cual contará con todas las formalizaciones
  de la **compra**. Este contará con los siguiente campos:
    - **_id_** (_ObjectId_): autogenerado por MongoDB.
    - **_code_** (_string_): debe autogenerarse y ser único.
    - **_purchase\_datetime_** (_timestamp_): fecha y hora exacta en la que
      se formalizó la **compra**.
    - **_amount_** (_number_): total de la **compra**.
    - **_purchaser_** (_string_): correo electrónico del **usuario** asociado
      al **carrito**.
- Implentar, en el _router_ de **carts**, la ruta `/:cid/purchase`, la cual
  permitirá finalizar el proceso de **compra** de dicho **carrito**.
  - La **compra** deberá corroborar el _stock_ del **producto** al momento de
    finalizarse:
    - Si el **producto** tiene suficiente _stock_ para la cantidad indicada en
      el **producto** del **carrito**, entonces restarlo del _stock_ del
      **producto** y continuar.
    - Si el **producto** no tiene suficiente _stock_ para la cantidad indicada
      en el **producto** del **carrito**, entonces no agregar el **producto**
      al proceso de compra.
  - Al final, utilizar el _servicio de **Tickets**_ para poder generar un
    **ticket** con los datos de la **compra**.
  - En caso de existir una **compra** no completada, devolver el arreglo con
    los _id's_ de los **productos** que no pudieron procesarse.
- Una vez finalizada la **compra**, el **carrito** asociado al **usuario** que
  compró, deberá contener sólo los **productos** que no pudieron comprarse. Es
  decir, se filtrarán los que sí se compraron y se quedan aquellos que no
  tenían _disponibilidad_.

### Formato

- Link al repositorio de GitHub con el proyecto (sin `node_modules`).
- Además, archivo `.env` para poder correr el proyecto.