class ApiController {
    getItems(req, res) {
        // Logic to retrieve items
        res.send('Retrieve items');
    }

    createItem(req, res) {
        // Logic to create an item
        res.send('Create item');
    }
}

module.exports = ApiController;