const Brands = require('../models/Brands');

exports.createBrandService = async (data) => {
    const result = await Brands.create(data);
    return result;
}

exports.getBrandService = async () => {
    const brands = await Brands.find({})
        .select('-products -suppliers');
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