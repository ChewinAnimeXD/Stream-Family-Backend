import SellPlatform from "../models/sellPlatform.model.js";

export const registerSellPlatform = async (req, res) => {
  const { name, sell, seller, createDate, buyDate, price, type, email, password, screen, pin } = req.body;
  //console.log("Entro a controller")

  try {
    const sellPlatform = new SellPlatform({
      name, sell, seller, createDate, buyDate, price, type, email, password, screen, pin
    });
    const sellPlatformSaved = await sellPlatform.save();

    res.json({
      Message: "Usuario creado satisfactoriamente",
      id: sellPlatformSaved._id,
      name: sellPlatformSaved.name,
      seller: sellPlatformSaved.seller,
      sell: sellPlatformSaved.sell,
      createDate: sellPlatformSaved.createDate,
      buyDate: sellPlatformSaved.buyDate,
      price: sellPlatformSaved.price,
      type: sellPlatformSaved.type,
      email: sellPlatformSaved.email,
      password: sellPlatformSaved.password,
      screen: sellPlatformSaved.screen,
      pin: sellPlatformSaved.pin,
    });
  } catch (error) {
    res.status(500).json({ Message: "Error al crear la plataforma", error: error.message });
  }
};

export const deleteSellPlatform = async (req, res) => {
  try {
    const sellPlatform = await SellPlatform.findByIdAndDelete(req.params.id);
    if (!sellPlatform) return res.status(404).json({ Message: "Plataforma no encontrada" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Plataforma no encontrada" });
  }
};

export const getSellPlatforms = async (req, res) => {
  try {
    const sellPlatforms = await SellPlatform.find({}); 
    res.json(sellPlatforms);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};


