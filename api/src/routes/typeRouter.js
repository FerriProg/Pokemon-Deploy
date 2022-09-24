const { Router } = require('express');
const { getTypes } = require('../controllers/index.js')

const typeRouter = Router();

typeRouter.get('/', async (req, res) => {
    try {
        let types = await getTypes();
        res.send(types)
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = typeRouter;