import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let users;

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return;
        }
        try {
            users = await conn.db("users").collection("users");
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`);
        }
    }

    static async addUser(email_address, username, password, gg_fullness) {
        try {
            const userDoc = {
                email_address: email_address,
                username: username,
                password: password,
                gg_fullness: gg_fullness,
            };

            return await users.insertOne(userDoc); // MongoDB will assign an _id automatically
        } catch (e) {
            console.error(`Unable to add user: ${e}`);
            return { error: e };
        }
    }

    static async getUser(userId) {
        try {
            return await users.findOne({ _id: new ObjectId(userId) });
        } catch (e) {
            console.error(`Unable to get User: ${e}`);
            return { error: e };
        }
    }

    static async getUserByUsername(username) {
        try {
            return await users.findOne({ username: username });
        } catch (e) {
            console.error(`Unable to get user by username: ${e}`);
            return { error: e };
        }
    }

    static async updateUser(userId, email_address, username, password, gg_fullness) {
        try {
            const updateResponse = await Users.updateOne(
                { _id: new ObjectId(userId) },
                { $set: { email_address: email_address, username: username, password: password, gg_fullness: gg_fullness } }
            );

            return updateResponse;
        } catch (e) {
            console.error(`Unable to update user: ${e}`);
            return { error: e };
        }
    }

    static async deleteUser(userId) {
        try {
            const deleteResponse = await users.deleteOne({ _id: new ObjectId(UserId) });

            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete User: ${e}`);
            return { error: e };
        }
    }

}

// curl -X POST http://localhost:8000/api/v1/users/new -H "Content-Type: application/json" -d '{"email_address": "manager@100lifelabs.com", "username": "manager", "password": "100percentlifelabs", "gg_fullness": "100"}'