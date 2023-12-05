import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import { ErrorCodes } from './error';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as messageService from './message.service';

export const createMessage = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(httpStatus.NOT_FOUND, ErrorCodes.UserNotFound);
  }
  const body = { ...req.body, user: req.user._id };
  const message = await messageService.createMessage(body);
  res.status(httpStatus.CREATED).send(message);
});

export const getMessages = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(httpStatus.NOT_FOUND, ErrorCodes.UserNotFound);
  }
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await messageService.queryMessages({ user: req.user?._id }, options);
  res.status(httpStatus.OK).send(result);
});

export const getMessage = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['messageId'] === 'string') {
    const msg = await messageService.getMessageById(new mongoose.Types.ObjectId(req.params['messageId']));
    if (!msg) {
      throw new ApiError(httpStatus.NOT_FOUND, ErrorCodes.MessageNotExist);
    }
    res.status(httpStatus.OK).send(msg);
  }
});

export const updateMessage = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['messageId'] === 'string') {
    const msg = await messageService.updateMessageById(new mongoose.Types.ObjectId(req.params['messageId']), req.body);
    res.send(msg);
  }
});

export const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['messageId'] === 'string') {
    await messageService.deleteMessageById(new mongoose.Types.ObjectId(req.params['messageId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
