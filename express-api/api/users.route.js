import express from 'express';
import UsersCtrl from './users.controller.js'; // Corrected path

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Users route is working!');
});
router.route('/user/:id').get(UsersCtrl.apiGetUser); // Corrected path; to get a single user
router.route('/new').get(UsersCtrl.apiPostUser); // Corrected path; to create a new user
router.route('/:id')
    .get(UsersCtrl.apiGetUsers) // Corrected path; to get all users
    .put(UsersCtrl.apiUpdateUser) // Corrected path; to update a user
    .delete(UsersCtrl.apiDeleteUser); // Corrected path; to delete a user

export default router;