const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    supplier: {
        type: String,
        required: [true, 'El proveedor es obligatorio'],
    },  
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        default: 0
    },    
});

module.exports = model( 'Product', ProductSchema );
