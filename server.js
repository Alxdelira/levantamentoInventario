import app from "./src/app.js"
import * as dotenv from "dotenv"
import swaggerUI from 'swagger-ui-express'; // para documentação com o swagger
import swaggerJsDoc from 'swagger-jsdoc';  // para documentação com o swagger
import swaggerOptions from './src/docs/head.js'; // importando configurações do swagger


dotenv.config()

const port = process.env.PORT || 3000;

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.7/swagger-ui.min.css";


const swaggerDocs = swaggerJsDoc(swaggerOptions);


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, { customCssUrl: CSS_URL }));


app.listen(port, () => console.log(`Servidor Rodando em http://localhost:${port}`));