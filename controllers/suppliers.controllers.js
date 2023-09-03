const {
    createSupplierService,
    getSupplierService,
    getSupplierByIdService,
    updateSupplierByIdServices
} = require("../services/suppliers.services");

exports.createSupplier = async (req, res) => {
    try {
        const result = await createSupplierService(req.body);

        res.status(200).json({
            status: "Successful",
            message: "Successfully created a supplier"
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: "Couldn't create the supplier. Please try again later!!!",
            error: error.message
        })
    }
}

exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await getSupplierService({});
        res.status(200).json({
            status: "Successful",
            data: suppliers
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't get the supplier. Please try again later!!!",
            error: error.message
        })
    }
}

exports.getSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await getSupplierByIdService(id);
        if (!supplier) {
            res.status(400).json({
                status: "Failed",
                error: `Couldn't find the supplier with this ${id}`,
                error: error.message
            })
        }
        res.status(200).json({
            status: "Successful",
            data: supplier
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't get the targeted supplier. Please try again later!!!",
            error: error.message
        })
    }
}

exports.updateSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await updateSupplierByIdServices(id, req.body);

        if (!result.modifiedCount) {
            res.status(400).json({
                status: "Failed",
                error: `Couldn't update the supplier with this ${id}`,
                error: error.message
            })
        }
        res.status(200).json({
            status: "Successful",
            message: `Successfully updated the supplier with ${id}`
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't updated the targeted supplier. Please try again later!!!",
            error: error
        })
    }
}