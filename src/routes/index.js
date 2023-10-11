import usuarios from "./usuariosRoutes.js";
import itens from "./itemRoutes.js";
import setores from "./setorRoutes.js";
import inventario from "./inventarioRoutes.js";
import login from "./loginRoutes.js";


const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).redirect("/docs")
  })
  app.use(
    usuarios,
    itens,
    setores,
    inventario,
    login
  )
}

export default routes;