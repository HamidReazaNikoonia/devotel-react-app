import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { IUser } from '../user/user.interfaces';

export interface IMessage {
  user: IUser;
  title: string;
  bodyMessage: string;
  notifyTime: Date;
  status?: boolean;
}

export interface IMessageModel extends Model<IMessageDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type IMessageDoc = Document & IMessage;

export type NewCreatedMessage = Omit<IMessage, 'user'>;
export type UpdateMessageBody = Omit<IMessage, 'user'>;
