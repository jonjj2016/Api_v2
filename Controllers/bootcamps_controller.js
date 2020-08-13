const ErrorHandler = require("../utils/ErrorHandler")
const asyncHandler = require('../middlewares/async');
const Modal = require('../Model/Bootcamp');
//@desc get all bootcamps
//@route GET api/v1/bootcapms
//@access Public

const find = asyncHandler(async(req, res, next) => {
    const data = await Modal.find({});
    res.status(201).json({
        success: true,
        total: data.length,
        data
    });


});
//@desc Get single bootcamp
//@route GET api/v1/bootcapms/:id
//@access Public
const get = asyncHandler(async(req, res, next) => {

    const data = await Modal.findById(req.params.id);
    if (!data) {
        return next(new ErrorHandler(`Item not found with an ID ${req.params.id}`, 404))
    }
    res.status(201).json({
        success: true,
        data
    });

});
//@desc Create single bootcamp
//@route POST api/v1/bootcapms
//@access Private
const create = asyncHandler(async(req, res, next) => {
    const {
        body
    } = req;

    const data = await Modal.create(body)
    res.status(201).json({
        success: true,
        data
    });


});
//@desc Update single bootcamp
//@route PATCH api/v1/bootcapms/:id
//@access Private
const patch = asyncHandler(async(req, res, next) => {

    const data = await Modal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!data) {
        return next(new ErrorHandler(`Item not found with an ID ${req.params.id}`, 404))
    }
    res.status(200).json({
        success: true,
        data
    });

});
//@desc Delete single bootcamp
//@route DELETE api/v1/bootcapms/:id
//@access Private
const remove = asyncHandler(async(req, res, next) => {

    const data = await Modal.findByIdAndRemove(req.params.id);
    if (!data) {
        return next(new ErrorHandler(`Item not found with an ID ${req.params.id}`, 404))
    }
    res.status(204).json({
        success: true,
        data: {}

    });

});

module.exports = {
    find,
    get,
    create,
    patch,
    remove
}