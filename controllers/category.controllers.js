const {
    getCategoriesServices,
    createCategoriesServices,
    getCategoryByIdService,
    updateCategoryByIdServices
} = require("../services/category.services");

exports.createCategory = async (req, res, next) => {
    try {
        const result = await createCategoriesServices(req.body);

        res.status(200).json({
            status: "Successful",
            message: "Successfully created a new category"
        })
        
    }
    catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Sorry!!! Category couldn't created. Please try again later!!!"
        })
        
    }
}

exports.getCategory = async (req, res, next) => {
    try {
        const category = await getCategoriesServices({});

        res.status(200).json({
            status: "Success",
            data: category
        })
        
    }
    catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Sorry, couldn't get the category!!!"
        })
        
    }
}

exports.getCategoryById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await getCategoryByIdService(id);
        if (!category) {
            res.status(400).json({
                status: "Failed",
                message: `Sorry, No category found for this $${id}`
            })
        }
        res.status(200).json({
            status: "Success",
            data: category
        })
        
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Sorry, couldn't get the targeted category!!!"
        })
        
    }
}

exports.updateCategoryById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await updateCategoryByIdServices(id, req.body);

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