const express = require('express');
const router = express.Router();
const {
    find,
    get,
    create,
    patch,
    remove
} = require('../Controllers/bootcamps_controller');


router.route('/')
    .get(find)
    .post(create);

router.route('/:id')
    .get(get)
    .patch(patch)
    .delete(remove);

module.exports = router