app.post("/payer", async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await fetch("https://api.maishapay.online/api/payment", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.MAISHAPAY_SECRET_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: Number(amount),
        phone: phone.replace("+", ""),
        currency: "XAF",
        description: "Paiement client Business Congo"
      })
    });

    const data = await response.json();

    console.log("Réponse API:", data); // 👈 IMPORTANT

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erreur serveur ❌"
    });
  }
});
