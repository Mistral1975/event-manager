// src/exceptions/UnauthorizedExceptions.js
import DomainException from "./DomainExceptions.js";

class UnauthorizedException extends DomainException {
  constructor(message = "Non autorizzato") {
    super(message, 401);
  }
}

export default UnauthorizedException;
