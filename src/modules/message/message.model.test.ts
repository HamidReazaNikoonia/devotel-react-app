import { faker } from '@faker-js/faker';
import { NewCreatedMessage } from './message.interfaces';
import Message from './message.model';

describe('Message model', () => {
  describe('Message validation', () => {
    let newMsg: NewCreatedMessage;
    beforeEach(() => {
      newMsg = {
        title: faker.name.findName(),
        bodyMessage: faker.lorem.sentences(),
        notifyTime: faker.date.future(),
      };
    });

    test('should correctly validate a valid Message', async () => {
      await expect(new Message(newMsg).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if title length is less than 8 characters', async () => {
      newMsg.title = 'abc';
      await expect(new Message(newMsg).validate()).rejects.toThrow();
    });

    test('should throw a validation error if title length is more than 20 characters', async () => {
      newMsg.title = 'aaaaaaaaaaaaaaaaaaaaaaaa';
      await expect(new Message(newMsg).validate()).rejects.toThrow();
    });

    test('should throw a validation error if bodyMessage does not contain any data', async () => {
      newMsg.bodyMessage = '';
      await expect(new Message(newMsg).validate()).rejects.toThrow();
    });

    test('should throw a validation error if notifyTime does not set', async () => {
      // @ts-ignore
      newMsg.notifyTime = undefined;
      await expect(new Message(newMsg).validate()).rejects.toThrow();
    });

    test('should throw a validation error if notifyTime is for past', async () => {
      const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
      newMsg.notifyTime = yesterday;
      await expect(new Message(newMsg).validate()).rejects.toThrow();
    });
  });
});
