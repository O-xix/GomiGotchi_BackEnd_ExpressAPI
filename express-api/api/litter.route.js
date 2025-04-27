import express from "express";
import multer from "multer";
import LittersController from "./litter.controller.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage: storage });

router.route("/").get((req, res) => {
  res.send("Litter route is working!");
});
router.route("/litter").get(LittersController.apiGetAllLitters);
router.route("/litter/:id").get(LittersController.apiGetLitterById);
router.route("/new").post(upload.single("before_image"), LittersController.apiPostLitter); // Handle file upload
router
  .route("/:id")
  .put(LittersController.apiUpdateLitter)
  .delete(LittersController.apiDeleteLitter);

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