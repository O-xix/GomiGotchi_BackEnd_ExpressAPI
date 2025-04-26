import express from 'express';
import LitterCtrl from './litter.controller.js'; // Corrected path

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Litter route is working!');
});
router.route('/litter/:id').get(LitterCtrl.apiGetLitter); // Corrected path
router.route('/new').get(LitterCtrl.apiPostLitter); // Corrected path
router.route('/:id')
    .get(LitterCtrl.apiGetLitters) // Corrected path
    .put(LitterCtrl.apiUpdateLitter) // Corrected path
    .delete(LitterCtrl.apiDeleteLitter); // Corrected path

export default router;