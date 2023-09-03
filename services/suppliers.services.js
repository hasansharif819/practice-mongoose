const Suppliers = require('../models/Supplier');

exports.createSupplierService = async (data) => {
    const result = await Suppliers.create(data);
    return result;
}

exports.getSupplierService = async () => {
    const suppliers = await Suppliers.find({})
    //populate
        // .populate("brands");
        // .select('-products -suppliers');
    //select korar fole products and suppliers ta supplier output dicche na.
    return suppliers
}

exports.getSupplierByIdService = async (id) => {
    const supplier = await Suppliers.findOne({ _id: id });
    return supplier;
}

exports.updateSupplierByIdServices = async (id, data) => {
    const result = await Suppliers.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
}