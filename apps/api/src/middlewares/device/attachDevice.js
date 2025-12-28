// apps/api/src/middlewares/device/attachDevice.js
module.exports = function attachDevice(req, _res, next) {
  req.deviceId = req.header("x-device-id") || null;
  next();
};
