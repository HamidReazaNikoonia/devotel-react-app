import Joi from 'joi';
import { password, objectId, isBeforeDate } from '../validate/custom.validation';
import { NewCreatedMessage } from './message.interfaces';

export const createMessageBody: Record<keyof NewCreatedMessage, any> = {
  title: Joi.string().required(),
  bodyMessage: Joi.string().required().custom(password),
  notifyTime: Joi.date().required().custom(isBeforeDate),
  status: Joi.boolean(),
};

export const getMessages = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getMessage = {
  params: Joi.object().keys({
    messageId: Joi.string().custom(objectId),
  }),
};

export const updateMessage = {
  params: Joi.object().keys({
    messageId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      bodyMessage: Joi.string(),
      notifyTime: Joi.date().custom(isBeforeDate),
    })
    .min(1),
};

export const deleteMessage = {
  params: Joi.object().keys({
    messageId: Joi.string().custom(objectId),
  }),
};
