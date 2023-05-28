import faker from 'faker-br';
import Setor from '../models/setor.js';
import Item from '../models/item.js';
import inventario from '../models/inventario.js';
import Usuarios from '../models/usuario.js';
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

function getItemID(qtd) {
    for (let i = 0; i < qtd; i++) {
        return itens[i]._id
    }
}

console.log(getItemID(10))

const itemPadrao = {
    setor: setor[0]._id,
    naoEtiquetado: false,
    encontrado: true,
    etiqueta: 77097,
    nome: "cadeira",
    descricao: "Uma cadeira muito legal",
    estado: "Em condições de uso",
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
            nome: faker.name.firstName(),
            ativo: true,
            estado: faker.random.arrayElement([
                "Em condições de uso",
                "Inservível",
                "Danificado"
            ]),
            descricao: faker.lorem.sentence(),
            responsavel: faker.name.findName(),
            image: faker.image.imageUrl(),
            setor: getSetorId(setor.length),
        }

        itens.push(seedItem);
    }
}

seedItens(50);
await Item.collection.insertMany(itens, { ordered: false });
console.log(itens.length + " Itens inseridos!")

// ------------------------------------------------------------

// inventários

await inventario.deleteMany();

const inventarios = [];

const inventarioPadrao = {
    setor: setor[0]._id,
    itens: itemPadrao,
    criadoEm: new Date()
}

inventarios.push(inventarioPadrao);

function seedInventario(qtdinventario,qtditens) {
    for (let i = 0; i < qtdinventario; i++) {
        inventarios.push({
            setor: faker.random.arrayElement(setor),
            bloco: faker.random.arrayElement(bloco_array),
            itens: getItemID(qtditens)
        })
    }
}
seedInventario(5,10)
await inventario.insertMany(inventarios);
console.log(inventarios.length + ' Inventários inseridos!');

// ------------------------------------------------------------

// Usuario

await Usuarios.deleteMany();

const usuarios = [];


const usuarioPadrao = {
    nome: "Mateus de Moraies",
    email: "mateus@gmail.dev",
    senha: "123",
    ativo: true
}

usuarios.push(usuarioPadrao);




function seedUsuario(qtdusuarios) {
    for (let i = 1; i <= qtdusuarios; i++) {
        let nome = faker.name.firstName();
        let nome_meio = faker.name.lastName();
        let sobrenome = faker.name.lastName();
        let email = nome + '.' + sobrenome + '@' + "gmail.com";

        const seedUsuarios =
        {
            nome: nome + ' ' + nome_meio + ' ' + sobrenome,
            email: email.toLowerCase(),
            senha: senhaHash(),
            ativo: true,
            // link_foto: faker.image.avatar(),
            // rotas: rotas,
            // grupos: removerChaves(grupos)

        };
        usuarios.push(seedUsuarios);
        // console.log('Usuários ' + i + ' inseridos!');
    }
    return usuarios;
}

seedUsuario(5);
await Usuarios.collection.insertMany(usuarios);
console.log(usuarios.length + ' Usuarios inseridos!');

// função para encrytar senha usando bcryptjs

function senhaHash() {
    return bcrypt.hashSync('123', 8);
}


//Deligando a conexão com o banco de dados com mensagem de sucesso ou de erro
db.close();
console.log('Conexão com o banco encerrada!');