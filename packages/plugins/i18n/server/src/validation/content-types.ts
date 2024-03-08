import { Common } from '@strapi/strapi';
import { z } from '@strapi/utils';

import { get, isNil } from 'lodash/fp';

const validateGetNonLocalizedAttributesSchema = z
  .object({
    model: z.string(),
    id: z.ID().optional(),
    locale: z.string(),
  })
  .strict()
  .refine((data) => {
    const isSingleType =
      get('kind', strapi.contentType(data.model as Common.UID.ContentType)) === 'singleType';

    if (!isSingleType && isNil(data.id)) {
      return false;
    }
    return true;
  });

const validateGetNonLocalizedAttributesInput = z.validate(validateGetNonLocalizedAttributesSchema);

export { validateGetNonLocalizedAttributesInput };
