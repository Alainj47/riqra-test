
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { getSupplierRamdom } = require('./products');

const usuariosGet = async(req, res) => {

    const usuarios = await Usuario.find();
    res.json({usuarios});
};

const usuariosPost =  async (req) => {

    const { correo, password } = req.body;
    //asigno proveedor aleatorio    
    const supplier = await getSupplierRamdom();
    const usuario = new Usuario({  correo, password, supplier });
    
    // encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt );

    //Guardar en BD
    await usuario.save();
    return usuario;
}



module.exports = {
    usuariosGet,
    usuariosPost,
}


