class Error {
  // Criei uma classe de erro para poder tratar eles adequadamente
  // e para poder exibir mensagens de acordo com a minha necessidade
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default Error;
