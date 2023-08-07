const Category = require('../models/Category');

exports.createCategoriesServices = async (data) => {
    const result = await Category.create(data);
    return result;
}

exports.getCategoriesServices = async () => {
    const category = await Category.find({})
        // .select('-products -suppliers');
    return category;
}

exports.getCategoryByIdService = async (id) => {
    const category = await Category.findOne({ _id: id });
    return category;
}

exports.updateCategoryByIdServices = async (id, data) => {
    const result = await Category.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
}