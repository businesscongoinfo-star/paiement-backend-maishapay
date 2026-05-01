const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Serveur OK ✅");
});

app.post("/payer", async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await fetch("https://api.maishapay.online/api/payment", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: amount,
        phone: phone,
        currency: "XAF"
      })
    });

    const data = await response.json();

    res.json({
      message: "Paiement envoyé 📱",
      data: data
    });

  } catch (err) {
    res.status(500).json({
      message: "Erreur serveur ❌",
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Serveur lancé 🚀"));