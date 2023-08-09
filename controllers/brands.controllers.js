const { createBrandService, getBrandService, getBrandByIdService, updateBrandByIdServices } = require("../services/brands.services")

exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body);

        res.status(200).json({
            status: "Successful",
            message: "Successfully created a brand"
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: "Couldn't create the brand. Please try again later!!!",
            error: error.message
        })
    }
}

exports.getBrands = async (req, res, next) => {
    try {
        const brands = await getBrandService({});
        res.status(200).json({
            status: "Successful",
            data: brands
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't get the brands. Please try again later!!!",
            error: error.message
        })
    }
}

exports.getBrandById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const brand = await getBrandByIdService(id);
        if (!brand) {
            res.status(400).json({
                status: "Failed",
                error: "Couldn't find the brands with this id",
                error: error.message
            })
        }
        res.status(200).json({
            status: "Successful",
            data: brand
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't get the targeted brand. Please try again later!!!",
            error: error.message
        })
    }
}

exports.updateBrandById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await updateBrandByIdServices(id, req.body);

        if (!result.modifiedCount) {
            res.status(400).json({
                status: "Failed",
                error: `Couldn't update the brands with this ${id}`,
                error: error.message
            })
        }
        res.status(200).json({
            status: "Successful",
            message: `Successfully updated the brand with ${id}`
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't updated the targeted brand. Please try again later!!!",
            error: error
        })
    }
}