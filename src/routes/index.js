import usuarios from "./usuariosRouters.js";
import itens from "./itemRoutes.js";
import setores from "./setorRoutes.js";
import inventario from "./inventarioRoutes.js";
import rotas from "./rotaRoutes.js";


const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).json({ message: "Bem vindo a Minha Api" })
  })
  app.use(
    usuarios,
    itens,
    setores,
    inventario,
    rotas
  )
}

export default routes;