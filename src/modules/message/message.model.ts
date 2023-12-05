import mongoose from 'mongoose';
import validator from 'validator';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IMessageDoc, IMessageModel } from './message.interfaces';

const messageSchema = new mongoose.Schema<IMessageDoc, IMessageModel>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 200,
    },
    bodyMessage: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    status: {
      type: Boolean,
      default: false,
    },
    notifyTime: {
      type: Date,
      validate(value: string) {
        const date: string = new Date(value).toLocaleDateString();
        if (validator.isBefore(date)) {
          throw new Error('Invalid Time');
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

const Message = mongoose.model<IMessageDoc, IMessageModel>('Message', messageSchema);

export default Message;
