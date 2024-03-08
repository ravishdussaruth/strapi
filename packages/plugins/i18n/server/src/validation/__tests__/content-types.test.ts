import { validateGetNonLocalizedAttributesInput } from '../content-types';

describe('validateGetNonLocalizedAttributesInput', () => {
  it('should throw when missing the model', () => {
    global.strapi = {
      contentType: jest.fn().mockReturnValue({
        kind: 'singleType',
      }),
    };

    expect(() =>
      validateGetNonLocalizedAttributesInput({
        locale: 'en',
      })
    ).toThrow();
  });

  it('should throw when missing the locale', () => {
    global.strapi = {
      contentType: jest.fn().mockReturnValue({
        kind: 'singleType',
      }),
    };

    expect(() =>
      validateGetNonLocalizedAttributesInput({
        model: 'test',
      })
    ).toThrow();
  });

  it('should throw when the id is missing for a collectionType', () => {
    global.strapi = {
      contentType: jest.fn().mockReturnValue({
        kind: 'collectionType',
      }),
    };

    expect(() =>
      validateGetNonLocalizedAttributesInput({
        model: 'test',
        locale: 'en',
      })
    ).toThrow();
  });

  it('should not throw when the id is missing for a singleType', () => {
    global.strapi = {
      contentType: jest.fn().mockReturnValue({
        kind: 'singleType',
      }),
    };

    expect(() =>
      validateGetNonLocalizedAttributesInput({
        model: 'test',
        locale: 'en',
      })
    ).not.toThrow();
  });

  it('should not throw when the id is provided for a collectionType', () => {
    global.strapi = {
      contentType: jest.fn().mockReturnValue({
        kind: 'collectionType',
      }),
    };

    expect(() =>
      validateGetNonLocalizedAttributesInput({
        model: 'test',
        id: '1',
        locale: 'en',
      })
    ).not.toThrow();
  });

  it('should not throw when the id is provided for a singleType', () => {
    global.strapi = {
      contentType: jest.fn().mockReturnValue({
        kind: 'singleType',
      }),
    };

    expect(() =>
      validateGetNonLocalizedAttributesInput({
        model: 'test',
        id: '1',
        locale: 'en',
      })
    ).not.toThrow();
  });
});
