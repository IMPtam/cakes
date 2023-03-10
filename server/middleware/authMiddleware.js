const tokenService = require("../services/tokenService");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    // Bearer lsdksdhaidhaiso - 1эл Bearer, 2эл - сам token
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Не авторизован!",
      });
    }

    const data = tokenService.validateAccess(token);
    if (!data) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Не авторизован!",
    });
  }
};
