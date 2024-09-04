import Platform from "../models/platform.model.js";

export const registerPlatform = async (req, res) => {
  const { name, sell, createDate, price, type, email, password, screen, pin } = req.body;
  //console.log("Entro a controller")

  try {
    const platform = new Platform({
      name, sell, createDate, price, type, email, password, screen, pin
    });
    const platformSaved = await platform.save();

    res.json({
      Message: "Usuario creado satisfactoriamente",
      id: platformSaved._id,
      name: platformSaved.name,
      sell: platformSaved.sell,
      createDate: platformSaved.createDate,
      price: platformSaved.price,
      type: platformSaved.type,
      email: platformSaved.email,
      password: platformSaved.password,
      screen: platformSaved.screen,
      pin: platformSaved.pin,
    });
  } catch (error) {
    res.status(500).json({ Message: "Error al crear la plataforma", error: error.message });
  }
};

export const getPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.find({}); 
    res.json(platforms);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const getPlatform = async (req, res) => {
  try {
    const platform = await Platform.findById(req.params.id);
    if (!platform) return res.status(404).json({ Message: "Plataforma no encontrada" });
    res.json(platform);
  } catch (error) {
    return res.status(404).json({ message: "Plataforma no encontrada" });
  }
};


export const deletePlatform = async (req, res) => {
  try {
    const platform = await Platform.findByIdAndDelete(req.params.id);
    if (!platform) return res.status(404).json({ Message: "Plataforma no encontrada" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Plataforma no encontrada" });
  }
};



export const updatePlatform = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // Asegúrate de que updateData esté definido

  try {
    const platform = await Platform.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // Asegúrate de que los datos cumplen con el esquema
    });

    if (!platform) {
      return res.status(404).json({ message: "Plataforma no encontrada" });
    }

    res.json(platform);
  } catch (error) {
    console.error("Error al actualizar la plataforma:", error); // Agrega detalles al log
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};
