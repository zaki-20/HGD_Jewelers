const Order = require("../models/orderModel");
const Watch = require("../models/watchModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo, //later
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

   
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo, //later
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        statusCode: 201,
        status: true,
        message: `order created successfully`,
        payload: {
            order
        }
    });

})

//get logged in user order
exports.myOrder = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id });
  
    res.status(201).json({
      statusCode: 200,
      status: true,
      message: `order created successfully`,
      payload: {
        orders
      }
    });
  });
  
  // get all Orders -- Admin
  exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
  
    let totalAmount = 0;
  
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  
    res.status(200).json({
      statusCode: 200,
      status: true,
      message: `order retrieved successfully`,
      payload: {
        orders,
        totalAmount,
      }
    });
  });
  
  // update Order status  -- Admin
  exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("you have already delieverd this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o._id, o.quantity);
      });
    }
  
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
  
    res.status(200).json({
      statusCode: 200,
      status: true,
      message: `order updated successfully`,
      payload: {}
    });
  });
  
  // delete Order -- Admin
  exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    await order.deleteOne();
  
    res.status(200).json({
      statusCode: 200,
      status: true,
      message: `order deleted successfully`,
      payload: {}
    });
  });
  
  //Fucntion for update stock===========
  async function updateStock(id, quantity) {
    const product = await Watch.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
  }