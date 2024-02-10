const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Watch = require("../models/watchModel");
const ErrorHandler = require("../utils/errorHandler.js");


//create product
exports.createWatch = catchAsyncErrors(async (req, res, next) => {
    req.body.seller = req.user.id

    console.log(req.body)
    const product = await Watch.create(req.body);
    res.status(201).json({
        statusCode: 201,
        status: true,
        message: "product has been created!",
        payload: {product}
    });

});



// Get All watches
exports.getAllWatches = catchAsyncErrors(async (req, res, next) => {
  try {
      const watches = await Watch.find();

      if (!watches || watches.length === 0) {
          return next(new ErrorHandler("Watches not found", 404));
      }

      res.status(200).json({
          statusCode: 200,
          status: true,
          message: "All watches have been fetched!",
          payload: {
              watches,
          }
      });
  } catch (error) {
      return next(new ErrorHandler("Internal Server Error", 500));
  }
});


//get watch details
exports.getWatchDetails = catchAsyncErrors(async (req, res, next) => {
    const watch = await Watch.findById(req.params.id);
  
    if (!watch) {
      return next(new ErrorHandler("watch not found", 404));
    }
    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "watch detail has been fetched!",
      payload: {
        watch
      }
    });
  });


//update watch 
exports.updateWatch = catchAsyncErrors(async (req, res, next) => {
    let watch = await Watch.findById(req.params.id);
    if (!watch) {
      return next(new ErrorHandler("watch not found", 404));
    }
    watch = await Watch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      statusCode: 200,
      status: true,
      message: "Product updated successfully!",
      payload: {}
    });
  });