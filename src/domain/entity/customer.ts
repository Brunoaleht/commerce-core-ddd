//Observar q no seu software vc tem uma entidade pra cuidar do neu negocio, e essa entidade tem q ter regras de negocio, e outra entidade/model q vai cuidar de armazenar os dados, ou seja, a entidade/model vai ser um espelho do banco de dados, e a entidade vai ser um espelho do seu negocio

import { Address } from "./address";

//Separar por pastas
//infra -> tudo q é relacionado ao mundo externo (banco de dados, api, etc)
//logo a minha entidade q é de setar e fazer os meus gets e persistir os dados, ela vai ser uma entidade da infra

//domain -> tudo q é relacionado ao meu negocio
//logo a minha entidade de regra de negocio vai ser uma entidade do domain

//Importante: toda entidade tem q se autovalidar, ou seja, ela tem q ter regras de negocio

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validade();
  }

  validade() {
    if (!this._id) {
      throw new Error("Id is required");
    }
    if (!this._name) {
      throw new Error("Name is required");
    }
  }

  public getId(): string {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }

  public getAddress(): Address {
    return this._address;
  }

  // Colocar os meus methods de class como regra de negocio
  public changeName(name: string): void {
    this._name = name;
    this.validade();
  }

  set Address(address: Address) {
    this._address = address;
  }

  public activate(): void {
    if (!this._address) {
      throw new Error("Address mandatory to activate customer");
    }
    this._active = true;
  }

  public deactivate(): void {
    this._active = false;
  }

  public isActive(): boolean {
    return this._active;
  }

  public getRewardPoints(): number {
    return this._rewardPoints;
  }

  public addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }

  public changeAddress(address: Address): void {
    this._address = address;
  }
}
