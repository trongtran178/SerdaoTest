import get from 'lodash/get';

export class Beneficiary {
  firstName: string;
  lastName: string;
  iban: string;

  constructor(firstName: string, lastName: string, iban: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.iban = iban;
  }

  static instantiate(json: unknown) {
    const firstName = get(json, 'firstName', '');
    const lastName = get(json, 'lastName', '');
    const iban = get(json, 'iban', '');
    return new Beneficiary(firstName, lastName, iban);
  }
}
