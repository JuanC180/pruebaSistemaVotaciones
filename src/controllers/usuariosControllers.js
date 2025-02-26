import Users from "../models/usuariosModels.js";


const usuariosGet = (req, res) => {
  res.send("desde users index")
}

export {
  usuariosGet
}