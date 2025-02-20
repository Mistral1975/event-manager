import tokenService from "../services/tokenService.js";

const refreshToken = async (req, res) => {
  try {
    console.log("Richiesta ricevuta per /refresh"); // 🔥 Debug
    console.log("Corpo della richiesta:", req.body); // 🔥 Debug

    const { refreshToken } = req.body;

    if (!refreshToken) {
      console.log("❌ Nessun refresh token ricevuto!"); // 🔥 Debug
      return res.status(400).json({ message: "Refresh Token mancante" });
    }

    console.log("🔹 Refresh Token ricevuto:", refreshToken); // 🔥 Debug

    const newAccessToken = await tokenService.refreshAccessToken(refreshToken);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("❌ Errore nel controller refreshToken:", error); // 🔥 Debug
    res.status(401).json({ message: error.message });
  }
};

export default { refreshToken }; // Esporta come oggetto
