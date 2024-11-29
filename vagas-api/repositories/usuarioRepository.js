const Usuario = require('../models/Usuario');

async function findAll() {
  return await Usuario.findAll();
}

async function findById(id) {
  return await Usuario.findByPk(id);
}

async function create({ nome, email, senha }) {
  return await Usuario.create({ nome, email, senha });
}

async function remove(id) {
  const user = await Usuario.findByPk(id);
  if (user) {
    await user.destroy();
    return user;
  }
  return null;
}

async function update(id, { nome, email, senha }) {
  const usuario = await Usuario.findByPk(id);
  if (usuario) {
    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senha;
    await usuario.save();
    return usuario;
  }
  return null;
}



module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};