const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Api - Levantamento Patrimonial",
      description: "Projeto para o Levantamento Patrimonial, feito em 2023 para o Instituto Federal de Rondônia - IFRO",
      version: "1.1.0",
      contact: {
        name: "Alexandre Nogueira",
        email: "alx.delira@gmail.com",
        url: "https://portfolioalxdelira.vercel.app/",
      },
    },
    servers: [     
      {
        url: 'https://levantamento-inventario.vercel.app/',
        description: "Api - Levantamento Patrimonial",
      },
      {
        url: 'http://localhost:3001',
        description: "Api - Levantamento Patrimonial",
      },
    ],
    components: {
      securitySchemes: {
        jwtAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        jwtAuth: [],
      },
    ],

  tags: [
    {
      name: "Login",
      description: "Operações para rota de Login",
    },
    {
      name: "Usuarios",
      description: "Operações para rota de Usuários"
    },
    {
      name: "Setores",
      description: "Operações para rota de Setores"
    },
    {
      name: "Itens",
      description: "Operações para rota de Itens"
    },
    {
      name: "Inventarios",
      description: "Operações para rota de Inventários"
    },

  ],
  paths: {},
},
  apis: ["./src/routes/*.js"]
};

export default swaggerOptions;
