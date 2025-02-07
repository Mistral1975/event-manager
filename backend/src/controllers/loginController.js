import loginService from "../services/loginService.js";

const loginController = async (req, res) => {
  try {
    const tokens = await loginService.login(req.body.email, req.body.password);
    res.status(200).json(tokens);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export default loginController;
