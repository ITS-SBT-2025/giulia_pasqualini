// estendo la classe Error per gestire lo status oltre al message
class ErrorWithStatus extends Error {
  status;
  message;

  // costruttore della classe: definisce quali sono gli input
  // quando istanzio un nuovo oggetto
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default ErrorWithStatus;