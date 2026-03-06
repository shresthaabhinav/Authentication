import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token Invalid or Expired",
    });
  }
};

export default userAuth;