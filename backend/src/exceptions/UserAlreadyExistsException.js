import DomainException from "./DomainExceptions.js";

class UserAlreadyExistsException extends DomainException {
  constructor(message = "L'utente esiste già") {
    super(message, 409);
  }
}

export default UserAlreadyExistsException;
