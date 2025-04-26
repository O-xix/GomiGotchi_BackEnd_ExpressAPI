import UsersDAO from "../dao/usersDAO.js";

export default class UsersController {
    static async apiGetUser(req, res, next) {
        try {
            let id = req.params.id || {};
            let user = await UsersDAO.getUserById(id);
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            res.json(user);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetUserByUsername(req, res, next) {
        try {
            const { username } = req.params; // Extract username from the request parameters
            const user = await UsersDAO.getUserByUsername(username); // Query the database by username

            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            res.json(user); // Return the user data
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e.message });
        }
    }

    static async apiPostUser(req, res, next) {
        try {
            const { email_address, username, password, gg_fullness } = req.body;

            console.log(req.body);

            const userResponse = await UsersDAO.addUser(
                email_address,
                username,
                password,
                gg_fullness
            );
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdateUser(req, res, next) {
        try {
            const userId = req.params.id;
            const { email_address, username, password, gg_fullness } = req.body;

            const userResponse = await UsersDAO.updateUser(
                userId,
                email_address,
                username,
                password,
                gg_fullness
            );

            var { error } = userResponse;
            if (error) {
                res.status(400).json({ error });
            }

            if (userResponse.modifiedCount === 0) {
                throw new Error("Unable to update user - user may not exist");
            }

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteUser(req, res, next) {
        try {
            const userId = req.params.id;
            const userResponse = await UsersDAO.deleteUser(userId);
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}