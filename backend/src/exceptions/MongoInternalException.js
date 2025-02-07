import DomainException from "./DomainExceptions.js";

class MongoInternalException extends DomainException {
  constructor(message = "Errore interno al database") {
    super(message, 500);
  }
}

export default MongoInternalException;
