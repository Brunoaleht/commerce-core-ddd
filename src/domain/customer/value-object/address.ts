//Object Value

export class Address {
  private _street: string;
  private _city: string;
  private _state: string;
  private _zipCode: string;
  private _number: number;

  constructor(
    street: string,
    city: string,
    state: string,
    zipCode: string,
    number: number
  ) {
    this._street = street;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;
    this._number = number;

    this.validade();
  }

  validade() {
    if (!this._street) {
      throw new Error("Street is required");
    }
    if (!this._city) {
      throw new Error("City is required");
    }
    if (!this._state) {
      throw new Error("State is required");
    }
    if (!this._zipCode) {
      throw new Error("ZipCode is required");
    }
    if (!this._number) {
      throw new Error("Number is required");
    }
  }

  get street(): string {
    return this._street;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  get number(): number {
    return this._number;
  }

  toString(): string {
    return `${this._street}, ${this._number} - ${this._city}/${this._state} - ${this._zipCode}`;
  }
}
