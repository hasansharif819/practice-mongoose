const {
    getStoresServices,
    createStoresServices,
    getStoreByIdService,
    updateStoreByIdServices
} = require("../services/store.services");

exports.createStore = async (req, res, next) => {
    try {
        const result = await createStoresServices(req.body);

        res.status(200).json({
            status: "Successful",
            message: "Successfully created a new store"
        })
    }
    catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Sorry!!! Store couldn't created. Please try again later!!!"
        })
    }
}

exports.getStores = async (req, res, next) => {
    try {
        const stores = await getStoresServices({});

        res.status(200).json({
            status: "Success",
            data: stores
        })
    }
    catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Sorry, couldn't get the stores!!!"
        })
    }
}

exports.getStoreById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const store = await getStoreByIdService(id);
        if (!store) {
            res.status(400).json({
                status: "Failed",
                message: `Sorry, No store found for this $${id}`
            })
        }
        res.status(200).json({
            status: "Success",
            data: store
        })
        
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Sorry, couldn't get the targeted store!!!"
        })
    }
}

exports.updateStoreById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await updateStoreByIdServices(id, req.body);

        if (!result.modifiedCount) {
            res.status(400).json({
                status: "Failed",
                message: `Sorry for updating with this ${id}`
            })
        }
        res.status(200).json({
            status: "Success",
            message: `Successfully updated with this ${id}`
        })
    }
    catch (error) {
        res.status(400).json({
            status: "Failed",
            message: `Sorry for updating this ${id}... Please try again later...`
        })
    }
}