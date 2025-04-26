import express from 'express';
import UsersController from './users.controller.js'; // Corrected path

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Users route is working!');
});
//router.route('/user/:id').get(UsersCtrl.apiGetUser); // Corrected path; to get a single user
router.route('/new').post(UsersController.apiPostUser); // Corrected path; to create a new user
router.route('/:id')
    .get(UsersController.apiGetUser) // Corrected path; to get all users
    .put(UsersController.apiUpdateUser) // Corrected path; to update a user
    .delete(UsersController.apiDeleteUser); // Corrected path; to delete a user
router.route("/user/:username").get(UsersController.apiGetUserByUsername);

export default router;