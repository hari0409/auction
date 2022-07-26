exports.login = async (req, res, next) => {
  try {
    const data=req.body
  } catch (error) {
    next(error);
  }
};
exports.create = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
