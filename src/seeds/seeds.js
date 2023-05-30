import faker from 'faker-br';
import Setor from '../models/setor.js';
import Item from '../models/item.js';
import Inventario from '../models/inventario.js';
import Usuarios from '../models/usuario.js';
import rotas from '../models/rota.js';
import db from '../config/dbConect.js';
import bcrypt from "bcrypt"

// estabelecendo e testando a conexão
db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
    console.log('Conexão com o banco estabelecida!')
});
// ----------------------------------------------------------

// Setor

//eliminando as rotas existentes
await Setor.deleteMany();

// array de unidades do negócio
// const unidades_array = ['Matriz', 'Filial 1', 'Filial 2']
const setor_array = ['setor 1', 'setor 2', 'setor 3']

function getSetorNome(i) {
    return setor_array[i].toString();
}

const bloco_array = ['Bloco A', 'Bloco B', 'Bloco C']

function getBlocoNome(i) {
    return bloco_array[i].toString();
}

// array de unidades geradas que será inserida no banco de dados
const setor = []

const setorPadrao = {
    nome: "setor Padrao",
    bloco: "Bloco Padrao",
    ativo: true
}

setor.push(setorPadrao);

function seedSetor(qtdsetor) {
    for (let i = 0; i < qtdsetor; i++) {
        const seedSetor = {
            nome: getSetorNome(i),
            bloco: getBlocoNome(i),
            ativo: true
        }
        setor.push(seedSetor);
    }
    return Setor;
}

seedSetor(setor_array.length);
await Setor.collection.insertMany(setor);
console.log(setor.length + ' Setores inseridos!');

// ----------------------------------------------------------

// Item Seed

await Item.deleteMany();
const itens = [];


const itemPadrao = {
    etiqueta: 77097,
    naoEtiquetado: false,
    encontrado: true,
    nome: "cadeira",
    setor: setor[0]._id,
    estado: "Em condições de uso",
    descricao: "Uma cadeira muito legal",
    responsavel: "Sra. Maria Reis",
    imagem_url: "http://lorempixel.com/640/480",
    ativo: true,
}

itens.push(itemPadrao);

function getSetorId(qtd) {
    for (let i = 0; i < qtd; i++) {
        return setor[i]._id
    }
}

function seedItens(qtdItens) {
    for (let i = 0; i < qtdItens; i++) {
        const seedItem = {
            etiqueta: faker.lorem.words(),
            naoEtiquetado: false,
            encontrado: true,
            nome: faker.name.firstName(),
            setor: getSetorId(setor.length),
            estado: faker.random.arrayElement([
                "Em condições de uso",
                "Inservível",
                "Danificado"
            ]),
            descricao: faker.lorem.sentence(),
            responsavel: faker.name.findName(),
            image: faker.image.imageUrl(),
            ativo: true,
        }

        itens.push(seedItem);
    }
}

seedItens(50);
await Item.collection.insertMany(itens, { ordered: false });

console.log(itens.length + " Itens inseridos!")

// ------------------------------------------------------------
// Inventarios Seeds

// Deletar todos os inventários existentes
await Inventario.deleteMany();

// Criação de itens
const item1 = await Item.findOne();
const item2 = await Item.findOne().skip(1);

const inventarios = [];

// Criação do inventário padrão
const inventarioPadrao = {
  setor: setor[0]._id,
  itens: [item1._id, item2._id],
  criadoEm: new Date()
};

inventarios.push(inventarioPadrao);

// Função para criar inventários aleatórios
function seedInventario(qtdInventario) {
  for (let i = 0; i < qtdInventario; i++) {
    const inventario = {
      setor: setor[i % setor.length]._id,
      bloco: faker.random.arrayElement(bloco_array),
      itens: [item1._id, item2._id]
    };
    inventarios.push(inventario);
  }
}

seedInventario(10);

// Inserir os inventários no banco de dados
await Inventario.insertMany(inventarios);
console.log(inventarios.length + ' Inventários inseridos!');

// ------------------------------------------------------------
//eliminando as rotas existentes
await rotas.deleteMany();

// função para gerar array de objetos com dados fake para rotas
const dadosRotas = [];

// função para retornar o nome de uma rota pela posição do array
let rotas_array = [
    'setores', 'itens',
    'usuarios', 'iventarios'
]
function getRotaName(i) {
    return rotas_array[i].toString();
}

function seedRotas(qtdrotas) {
    for (let i = 0; i < qtdrotas; i++) {
        const rota = {
            rota: getRotaName(i),
            ativo: true,
            verbos: {
                get: true,
                put: true,
                patch: true,
                delete: true,
                post: true,
            }
        }
        dadosRotas.push(rota);
    }
    return dadosRotas;
}

seedRotas(rotas_array.length);
await rotas.collection.insertMany(dadosRotas);
console.log(dadosRotas.length + ' Rotas inseridas!');

// função para passar as rotas para os usuários
const rotas_usuarios = [];
function seedRotasUsuarios(qtd) {
    // limpar array rotas_grupos
    rotas_usuarios.length = 0;
    for (let i = 0; i < (qtd); i++) {
        rotas_usuarios.push(dadosRotas[i]);
    }
    return rotas_usuarios;
};
//_________________________________________________________

// Usuario

await Usuarios.deleteMany();

const usuarios = [];

const usuarioPadrao = {
    nome: 'Mateus de Moraies',
    email: 'mateus@gmail.dev',
    senha: '123',
    ativo: true,
    rota: [{
        rota: "padrão",
        ativo: true,
        verbos: {
            get: true,
            put: true,
            patch: true,
            delete: true,
            post: true,
        }
    }], // Array vazio para armazenar as rotas
};

usuarios.push(usuarioPadrao);

function seedUsuario(qtdusuarios) {
    for (let i = 1; i <= qtdusuarios; i++) {
        const nome = faker.name.firstName();
        const nome_meio = faker.name.lastName();
        const sobrenome = faker.name.lastName();
        const email = `${nome}.${sobrenome}@gmail.com`;

        const seedUsuarios = {
            nome: `${nome} ${nome_meio} ${sobrenome}`,
            email: email.toLowerCase(),
            senha: senhaHash(),
            ativo: true,
            rota: dadosRotas.map((rota) => {
                return {
                    rota: rota.rota,
                    verbos: rota.verbos
                };
            }),
        };

        usuarios.push(seedUsuarios);
    }
    return usuarios;
}

seedUsuario(20);
await Usuarios.collection.insertMany(usuarios);
console.log(usuarios.length + ' Usuários inseridos!');

// Função para criptografar senha usando bcryptjs
function senhaHash() {
    return bcrypt.hashSync('123', 8);
}

// Desconectando do banco de dados com mensagem de sucesso ou erro
db.close();
console.log('Conexão com o banco encerrada!');