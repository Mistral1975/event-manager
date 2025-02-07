import tokenService from "../services/tokenService.js";

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh Token mancante" });
    }

    const newAccessToken = tokenService.refreshAccessToken(refreshToken);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export default { refreshToken };
