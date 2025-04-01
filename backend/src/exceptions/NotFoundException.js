// src/exceptions/NotFoundExceptions.js
import DomainException from "./DomainExceptions.js";

class NotFoundException extends DomainException {
  constructor(message = "Risorsa non trovata") {
    super(message, 404);
  }
}

export default NotFoundException;
