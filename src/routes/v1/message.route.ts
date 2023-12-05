import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { messageController, messageValidation } from '../../modules/message';
// import { userController } from '../../modules/user';

const router: Router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
// router.param('userId', userController.load);

router
  .route('/')
  .get(auth(), validate(messageValidation.getMessages), messageController.getMessages)
  .post(auth(), validate(messageValidation.createMessageBody), messageController.createMessage);

router
  .route('/:messageId')
  .get(auth(), validate(messageValidation.getMessage), messageController.getMessage)
  .patch(auth(), validate(messageValidation.updateMessage), messageController.updateMessage)
  .delete(auth(), validate(messageValidation.deleteMessage), messageController.deleteMessage);

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

export default router;
