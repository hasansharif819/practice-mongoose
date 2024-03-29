const Brands = require('../models/Brands');

exports.createBrandService = async (data) => {
    const result = await Brands.create(data);
    return result;
}

exports.getBrandService = async () => {
    const brands = await Brands.find({})
        // .populate("products");
        // .select('-products -suppliers');
    //select korar fole products and suppliers ta brand output dicche na.
    return brands;
}

exports.getBrandByIdService = async (id) => {
    const brand = await Brands.findOne({ _id: id });
    return brand;
}

exports.updateBrandByIdServices = async (id, data) => {
    const result = await Brands.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
}