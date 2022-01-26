const { request, response } = require("express")


const esAdminRole = ( req = request, res = response, next ) => {

    if (!req.usuario){
        return res.status(500).json({
            msg: "Se quiere verificar el role sin validar antes el usuario"
        });    
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El ${nombre} no es administrador - No puede eliminar a otro usuario`
        });
    }

    next();
}

const tieneRol = ( ...roles ) => {
    return (req = request, res = response, next  ) => {
        if (!req.usuario){
            return res.status(500).json({
                msg: "Se quiere verificar el role sin validar antes el usuario"
            });    
        }

        if ( !roles.includes( req.usuario.rol ) ){
            return res.status(401).json({
                msg: `El servicio requiere alguno de estos roles: ${roles}`
            });    
        }
        
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRol
}