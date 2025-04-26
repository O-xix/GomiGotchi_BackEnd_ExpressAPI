import fs from "fs";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let litter;

export default class LitterDAO {
    static async injectDB(conn) {
        if (litter) {
            return;
        }
        try {
            litter = await conn.db("litter").collection("litter");
        } catch (e) {
            console.error(`Unable to establish collection handles in LitterDAO: ${e}`);
        }
    }

    static async addLitter(before_image_path, caption, latitude, longitude, after_image_path, status, pick_up_time) {
        try {
            // Read images as binary data
            const before_image = fs.readFileSync(before_image_path);
            const after_image = fs.readFileSync(after_image_path);

            const litterDoc = {
                before_image: before_image, // Binary data
                caption: caption,
                latitude: latitude,
                longitude: longitude,
                after_image: after_image, // Binary data
                status: status,
                created_time: new Date(), // Automatically set the creation time
                pick_up_time: pick_up_time ? new Date(pick_up_time) : null, // Optional pick-up time
            };

            return await litter.insertOne(litterDoc);
        } catch (e) {
            console.error(`Unable to add Litter: ${e}`);
            return { error: e };
        }
    }

    static async getLitterById(litterId) {
        try {
            return await litter.findOne({ _id: new ObjectId(litterId) });
        } catch (e) {
            console.error(`Unable to get litter by ID: ${e}`);
            return { error: e };
        }
    }

    static async getAllLitters() {
        try {
            const cursor = await litter.find({});
            return cursor.toArray();
        } catch (e) {
            console.error(`Unable to get all litters: ${e}`);
            return { error: e };
        }
    }

    static async updateLitter(litterId, before_image_path, caption, latitude, longitude, after_image_path, status, pick_up_time) {
        try {
            // Read images as binary data if provided
            const before_image = before_image_path ? fs.readFileSync(before_image_path) : undefined;
            const after_image = after_image_path ? fs.readFileSync(after_image_path) : undefined;

            const updateFields = {
                caption: caption,
                latitude: latitude,
                longitude: longitude,
                status: status,
                pick_up_time: pick_up_time ? new Date(pick_up_time) : null,
                updated_at: new Date(),
            };

            if (before_image) updateFields.before_image = before_image;
            if (after_image) updateFields.after_image = after_image;

            const updateResponse = await litter.updateOne(
                { _id: new ObjectId(litterId) },
                { $set: updateFields }
            );

            return updateResponse;
        } catch (e) {
            console.error(`Unable to update litter: ${e}`);
            return { error: e };
        }
    }

    static async deleteLitter(litterId) {
        try {
            const deleteResponse = await litter.deleteOne({ _id: new ObjectId(litterId) });
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete litter: ${e}`);
            return { error: e };
        }
    }
}