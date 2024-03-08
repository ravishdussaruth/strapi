import { z } from 'zod';

import { ValidationError } from './errors';

export * from 'zod';

export const validate =
  <T extends z.ZodTypeAny>(schema: T) =>
  (data: unknown): T['_output'] => {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // TODO: update details format
        const message = error.errors.map((e) => e.message).join('\n');
        throw new ValidationError(message, {
          errors: error.issues,
        });
      }
    }
  };

export const ID = () => z.string().or(z.number());
