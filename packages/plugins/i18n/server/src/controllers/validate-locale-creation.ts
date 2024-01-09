import { get } from 'lodash/fp';
import { errors } from '@strapi/utils';
import type { Common, Schema } from '@strapi/types';
import type { Next, ParameterizedContext } from 'koa';
import { getService } from '../utils';

const { ApplicationError } = errors;

const validateLocaleCreation: Common.MiddlewareHandler = async (
  ctx: ParameterizedContext,
  next: Next
) => {
  const { model } = ctx.params;
  const { query, body } = ctx.request;

  const {
    getValidLocale,
    getNewLocalizationsFrom,
    isLocalizedContentType,
    getAndValidateRelatedEntity,
    fillNonLocalizedAttributes,
  } = getService('content-types');

  const modelDef = strapi.getModel(model) as Schema.ContentType;

  if (!isLocalizedContentType(modelDef)) {
    return next();
  }

  const locale = get('plugins.i18n.locale', query);
  const relatedEntityId = get('plugins.i18n.relatedEntityId', query);
  // cleanup to avoid creating duplicates in singletypes
  ctx.request.query = {};

  let entityLocale;
  try {
    entityLocale = await getValidLocale(locale);
  } catch (e) {
    throw new ApplicationError("This locale doesn't exist");
  }

  (body as any).locale = entityLocale;

  if (modelDef.kind === 'singleType') {
    const entity = await strapi.entityService.findMany(modelDef.uid, {
      locale: entityLocale,
    } as any);

    ctx.request.query.locale = (body as any).locale;

    // updating
    if (entity) {
      return next();
    }
  }

  let relatedEntity;
  try {
    relatedEntity = await getAndValidateRelatedEntity(relatedEntityId, model, entityLocale);
  } catch (e) {
    throw new ApplicationError(
      "The related entity doesn't exist or the entity already exists in this locale"
    );
  }

  fillNonLocalizedAttributes(body, relatedEntity, { model });
  const localizations = await getNewLocalizationsFrom(relatedEntity);
  (body as any).localizations = localizations;

  return next();
};

export default validateLocaleCreation;
