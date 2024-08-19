import { describe, it, expect } from "@jest/globals";
import { Beneficiary } from "../../../src/models";

describe('Beneficiary', () => {
  it('should instantiate a beneficiary', () => {
    const beneficary = {
      firstName: 'John',
      lastName: 'Doe',
      iban: 'DE89370400440532013000',
    };
    const result = Beneficiary.instantiate(beneficary);
    expect(result).toBeInstanceOf(Beneficiary);
    expect(result.name).toEqual('John Doe');
    expect(result.iban).toEqual('DE89370400440532013000');
  });

  it('should throw an error if json is not a valid Beneficiary model', () => {
    const beneficary = {
      firstName: 'John',
      lastName: 'Doe',
    };
    expect(() => Beneficiary.instantiate(beneficary)).toThrowError(
      'Beneficiary needs a valid iban',
    );
  });

  it('should throw an error if first name is not valid', () => {
    const beneficary = {
      firstName: 'John1',
      lastName: 'Doe',
      iban: 'DE89370400440532013000',
    };
    expect(() => Beneficiary.instantiate(beneficary)).toThrowError(
      'Beneficiary needs a valid first name',
    );
  });

  it('should throw an error if last name is not valid', () => {
    const beneficary = {
      firstName: 'John',
      lastName: 'Doe1',
      iban: 'DE89370400440532013000',
    };
    expect(() => Beneficiary.instantiate(beneficary)).toThrowError(
      'Beneficiary needs a valid lastName',
    );
  });

  it('should throw an error if iban is not valid', () => {
    const beneficary = {
      firstName: 'John',
      lastName: 'Doe',
      iban: 'DE8937040044053201300',
    };
    expect(() => Beneficiary.instantiate(beneficary)).toThrowError(
      'Beneficiary needs a valid iban',
    );
  });

  it('should throw an error if json parameter is not a valid Beneficiary model', () => {
    expect(() => Beneficiary.instantiate(null)).toThrowError(
      'json parameter should be a valid Beneficiary model',
    );
  });

  it('should throw an error if name is not valid', () => {
    const beneficary = {
      firstName: 'John',
      lastName: 1,
      iban: 'DE89370400440532013000',
    };
    expect(() => Beneficiary.instantiate(beneficary)).toThrowError(
      'Beneficiary needs a valid lastName',
    );
  });
});
