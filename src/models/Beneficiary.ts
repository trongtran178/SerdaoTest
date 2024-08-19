import get from 'lodash/get';
import {FIRST_NAME_REGEX, IBAN_REGEX, LAST_NAME_REGEX} from '../constants';

export class Beneficiary {
  name: string;
  iban: string;

  constructor(name: string, iban: string) {
    this.name = name;
    this.iban = iban;
  }

  static instantiate(json: unknown) {
    const firstName = get(json, 'firstName', '');
    const lastName = get(json, 'lastName', '');
    const iban = get(json, 'iban', '');

    if (typeof json !== 'object' || json === null) {
      throw new Error('json parameter should be a valid Beneficiary model');
    }

    if (
      typeof firstName !== 'string' ||
      firstName.trim() === '' ||
      FIRST_NAME_REGEX.test(firstName) === false
    ) {
      throw new Error('Beneficiary needs a valid first name');
    }

    if (
      typeof lastName !== 'string' ||
      lastName.trim() === '' ||
      LAST_NAME_REGEX.test(lastName) === false
    ) {
      throw new Error('Beneficiary needs a valid lastName');
    }

    const fullName = `${firstName} ${lastName}`;
    console.log(fullName);
    if (typeof fullName !== 'string' || fullName.trim() === '') {
      throw new Error('Beneficiary needs a valid name');
    }

    if (
      typeof iban !== 'string' ||
      iban.trim() === '' ||
      IBAN_REGEX.test(iban) === false
    ) {
      throw new Error('Beneficiary needs a valid iban');
    }

    return new Beneficiary(fullName, iban);
  }
}
