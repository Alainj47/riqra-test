const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { send } = require('../helpers/mailgun');
const { usuariosPost } = require('./usuarios');

const login = async(req, res = response) => {

    const { correo, password} = req.body;
    let messg = 'User logged in';

    try {
        // Verificar si email existe
        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            // Si el email no existe, creo un usuario
            usuario = await usuariosPost(req);
            messg = 'User created'
            //Envío correo al nuevo usuario
            await send(correo);
        }else{
            // Si existe el usuario
            //Verificar la contraseña
            const validPass = bcryptjs.compareSync( password, usuario.password);
            if (!validPass){
                return res.status(400).json({
                    msg: "Oops! wrong password"
                })
            }                    

        }
    
        // Generar el json web token
        const token = await generarJWT( usuario.id );

        res.json({
            msg: messg,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error'
        })
    }
}


module.exports = {
    login
}