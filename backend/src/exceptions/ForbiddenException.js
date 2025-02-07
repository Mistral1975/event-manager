import DomainException from "./DomainExceptions.js";

class ForbiddenException extends DomainException {
  constructor(message = "Accesso negato") {
    super(message, 403);
  }
}

export default ForbiddenException;
