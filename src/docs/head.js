const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Api - Levantamento Patrimonial",
      description: "Projeto de criação de uma API para um sistema de Levantamento de Inventario do Instituto Federal de Rondônia - IFRO.",
      version: "1.0.0"
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: "Api - Levantamento Patrimonial",
      }
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
      description: "Operação para rota de Login",
    },
    {
      name: "Usuarios",
      description: "Operações para rota de Usuários"
    },
    {
      name: "Rotas",
      description: "Operações para rota de Rotas"
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
      description: "Operações para rota de sInventários"
    },

  ],
  paths: {},
},
  apis: ["./src/routes/*.js"]
};

export default swaggerOptions;
