import LitterDAO from "../dao/litterDAO.js";

export default class LitterController {
    static async apiPostLitter(req, res, next) {
        try {
            const before_image = req.file.buffer; // Get the uploaded file as a Buffer
            const { caption, latitude, longitude, status, pick_up_time } = req.body;

            const litterResponse = await LitterDAO.addLitter(
                before_image,
                caption,
                parseFloat(latitude),
                parseFloat(longitude),
                status,
                pick_up_time ? new Date(pick_up_time) : null
            );

            res.json({ status: "success", litterId: litterResponse.insertedId });
        } catch (e) {
            console.error(`api, ${e}`);
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetLitterById(req, res, next) {
        try {
            const litterId = req.params.id;
            const litter = await LitterDAO.getLitterById(litterId);

            if (!litter) {
                res.status(404).json({ error: "Litter not found" });
                return;
            }

            res.json(litter);
        } catch (e) {
            console.error(`api, ${e}`);
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetAllLitters(req, res, next) {
        try {
            const litters = await LitterDAO.getAllLitters();
            res.json(litters);
        } catch (e) {
            console.error(`api, ${e}`);
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdateLitter(req, res, next) {
        try {
            const litterId = req.params.id;
            const { before_image_path, caption, latitude, longitude, after_image_path, status, pick_up_time } = req.body;

            const updateResponse = await LitterDAO.updateLitter(
                litterId,
                before_image_path,
                caption,
                latitude,
                longitude,
                after_image_path,
                status,
                pick_up_time
            );

            if (updateResponse.modifiedCount === 0) {
                throw new Error("Unable to update Litter - Litter may not exist");
            }

            res.json({ status: "success" });
        } catch (e) {
            console.error(`api, ${e}`);
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteLitter(req, res, next) {
        try {
            const litterId = req.params.id;
            const deleteResponse = await LitterDAO.deleteLitter(litterId);

            res.json({ status: "success" });
        } catch (e) {
            console.error(`api, ${e}`);
            res.status(500).json({ error: e.message });
        }
    }
}