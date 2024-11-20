//Object Value

export class Address {
  private street: string;
  private city: string;
  private state: string;
  private zipCode: string;
  private number: number;

  constructor(
    street: string,
    city: string,
    state: string,
    zipCode: string,
    number: number
  ) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.number = number;

    this.validade();
  }

  validade() {
    if (!this.street) {
      throw new Error("Street is required");
    }
    if (!this.city) {
      throw new Error("City is required");
    }
    if (!this.state) {
      throw new Error("State is required");
    }
    if (!this.zipCode) {
      throw new Error("ZipCode is required");
    }
    if (!this.number) {
      throw new Error("Number is required");
    }
  }

  toString(): string {
    return `${this.street}, ${this.number} - ${this.city}/${this.state} - ${this.zipCode}`;
  }
}
