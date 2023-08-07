const Store = require('../models/Store');

exports.createStoresServices = async (data) => {
    const result = await Store.create(data);
    return result;
}

exports.getStoresServices = async () => {
    const store = await Store.find({})
        // .select('-products -suppliers');
    return store;
}

exports.getStoreByIdService = async (id) => {
    const store = await Store.findOne({ _id: id });
    return store;
}

exports.updateStoreByIdServices = async (id, data) => {
    const result = await Category.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
}