import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Message from './message.model';
import ApiError from '../errors/ApiError';
import { ErrorCodes } from './error';
import { IOptions, QueryResult } from '../paginate/paginate';
import { NewCreatedMessage, UpdateMessageBody, IMessageDoc } from './message.interfaces';

/**
 * Create a user
 * @param {NewCreatedMessage} messageBody
 * @returns {Promise<IMessageDoc>}
 */
export const createMessage = async (messageBody: NewCreatedMessage): Promise<IMessageDoc> => {
  return Message.create(messageBody);
};

/**
 * Query for messages
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryMessages = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const messages = await Message.paginate(filter, options);
  return messages;
};

/**
 * Get message by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IMessageDoc | null>}
 */
export const getMessageById = async (id: mongoose.Types.ObjectId): Promise<IMessageDoc | null> => Message.findById(id);

/**
 * Update message by id
 * @param {mongoose.Types.ObjectId} messageId
 * @param {UpdateMessageBody} updateBody
 * @returns {Promise<IMessageDoc | null>}
 */
export const updateMessageById = async (
  userId: mongoose.Types.ObjectId,
  updateBody: UpdateMessageBody
): Promise<IMessageDoc | null> => {
  const message = await getMessageById(userId);
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, ErrorCodes.MessageNotExist);
  }

  Object.assign(message, updateBody);
  await message.save();
  return message;
};

/**
 * Delete message by id
 * @param {mongoose.Types.ObjectId} messageId
 * @returns {Promise<IMessageDoc | null>}
 */
export const deleteMessageById = async (messageId: mongoose.Types.ObjectId): Promise<IMessageDoc | null> => {
  const message = await getMessageById(messageId);
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, ErrorCodes.MessageNotExist);
  }
  await message.deleteOne();
  return message;
};
