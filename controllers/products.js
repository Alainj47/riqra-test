const Product = require('../models/product');

const productosGet = async(req, res) => {

    const { supplier } = req.usuario;
    const products = await Product.find({supplier});
    res.json({products});
};

const productosGetByName = async(req, res) => {
    const { name } = req.params;
    const { supplier } = req.usuario;

    const regex = new RegExp( name, 'i' );
    const productos = await Product.find({ name: regex, supplier})

    res.json({
        results: productos
    });
}

const getSupplierRamdom = async() => {
    const products = await Product.aggregate([
        {
            $group: {
                _id: {supllier: "$supplier"},
            }
        }
    ]);

    const suppliers = [];
    for(const doc of products) {
        suppliers.push(doc._id.supllier)
    }

    const random = Math.floor(Math.random() * suppliers.length);

    return suppliers[random];
}


module.exports = {
    productosGet,
    getSupplierRamdom,
    productosGetByName
}



