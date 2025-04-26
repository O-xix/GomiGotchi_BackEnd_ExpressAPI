import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let Litter;

export default class LitterDAO {
    static async injectDB(conn) {
        if (Litter) {
            return;
        }
        try {
            Litter = await conn.db("Litter").collection("Litter");
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`);
        }
    }

    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = { movieId: movieId, user: user, review: review };

            return await Litter.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e };
        }
    }

    static async getReview(reviewId) {
        try {
            return await Litter.findOne({ _id: new ObjectId(reviewId) });
        } catch (e) {
            console.error(`Unable to get review: ${e}`);
            return { error: e };
        }
    }

    static async updateReview(reviewId, user, review) {
        try {
            const updateResponse = await Litter.updateOne(
                { _id: new ObjectId(reviewId) },
                { $set: { user: user, review: review } }
            );

            return updateResponse;
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e };
        }
    }

    static async deleteReview(reviewId) {
        try {
            const deleteResponse = await Litter.deleteOne({ _id: new ObjectId(reviewId) });

            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete review: ${e}`);
            return { error: e };
        }
    }

    static async getLitterByMovieId(movieId) {
        try {
            const cursor = await Litter.find({ movieId: parseInt(movieId) });
            return cursor.toArray();
        } catch (e) {
            console.error(`Unable to get Litter: ${e}`);
            return { error: e };
        }
    }

}