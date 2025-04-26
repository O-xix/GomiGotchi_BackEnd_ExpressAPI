import express from 'express';
import LittersController from './litter.controller.js'; // Corrected path

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Litter route is working!');
});
router.route('/litter').get(LittersController.apiGetAllLitters); // Corrected path
router.route('/litter/:id').get(LittersController.apiGetLitterById); // Corrected path
router.route('/new').post(LittersController.apiPostLitter); // Corrected path
router.route('/:id')
    .put(LittersController.apiUpdateLitter) // Corrected path
    .delete(LittersController.apiDeleteLitter); // Corrected path

export default router;

/*
POST /api/v1/litter/new
Content-Type: application/json

{
    "before_image_path": "./images/before.jpg",
    "caption": "Litter near the park",
    "latitude": 47.6097,
    "longitude": -122.3331,
    "after_image_path": "./images/after.jpg",
    "status": "pending",
    "pick_up_time": "2025-04-30T10:00:00Z"
}
*/