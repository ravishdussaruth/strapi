import { z } from '@strapi/utils';

import { isoCodes } from '../constants';

const createLocaleSchema = z
  .object({
    name: z.string().max(50).nullish(),
    code: z.enum(isoCodes),
    isDefault: z.boolean(),
  })
  .strict();

const updateLocaleSchema = z
  .object({
    name: z.string().min(1).max(50).nullish(),
    isDefault: z.boolean().optional(),
  })
  .strict();

const validateCreateLocaleInput = z.validate(createLocaleSchema);
const validateUpdateLocaleInput = z.validate(updateLocaleSchema);

export { validateCreateLocaleInput, validateUpdateLocaleInput };
