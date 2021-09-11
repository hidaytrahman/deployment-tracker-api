const DeploymentSchema = require('../model/Deployment');

module.exports = {

    /*========== Get Deployment =============*/
    getDeployment: (req, res) => {
        try {
            DeploymentSchema.find().select({ __v: 0 })
                .exec((err, result) => {

                    // result manipulation according to the reference
                    const modifiedResult = result.map((item) => {
                        return {
                            id: item._id,
                            version: item.version,
                            deployedAt: item.deployed,
                            name: item.templateName
                        }
                    });

                    res.status(200).json(modifiedResult);
                });

        } catch (err) {
            res.status(400).json({
                message: "Something went wrong :("
            });
        }

    },


    /*========== Create Deployment =============*/
    addDeployment: async (req, res) => {

        try {
            const { url, templateName, version } = req.body;

            // check if all fields are present
            if (url && templateName && version) {

                // check if template is already exists
                const data = await DeploymentSchema.findOne({ templateName: templateName });

                if (!data) {
                    const doc = new DeploymentSchema({
                        url: url,
                        templateName: templateName,
                        version: [version] // add version as an array
                    });


                    //save in to the DB
                    doc.save((err, result) => {

                        // throw an error if any
                        if (err) {
                            console.log('err ', err);
                            return res.status(400).json({
                                message: err.message
                            });
                        }

                        // response a success message
                        res.status(200).json({
                            message: "Deployment has been added successfully !!!"
                        });

                    });

                } else {

                    // check if the version is exist
                    const versionExists = data.version.filter((item) => item === version);

                    if (versionExists && versionExists.length > 0) {
                        return res.status(400).json({
                            message: `This version (${version}) is already exists`
                        })
                    } else {
                        const filter = { templateName };
                        const update = {
                            url: url,
                            version: [...data.version, version]
                        };

                        let doc = await DeploymentSchema.findOneAndUpdate(filter, update);

                        if (doc) {
                            res.status(200).json({
                                message: `Version (${version}) against ${templateName} has been added successfully`
                            });
                        }
                    }



                }



            } else {
                return res.status(400).json({
                    message: "All fields are mandatory!"
                })
            }

        }
        catch (error) {
            res.status(400).json({
                message: "Something went wrong :("
            });
        };
    },


    /*========== delete Deployment =============*/
    deleteDeployment: (req, res) => {
        try {
            const templateName = req.body.templateName;

            // only proceed if templateName is in the request body
            if (templateName) {

                DeploymentSchema.findOneAndDelete({ templateName: templateName }, (err, result) => {
                    if (err) throw err;

                    console.log(' result ', result);

                    // if exist delete
                    if (result) {
                        res.status(200).json({
                            message: `${templateName} : deployment has been deleted.`
                        });
                    } else {
                        res.status(200).json({
                            message: `${templateName} : Doesn't exist.`
                        });
                    }

                });
            } else {
                res.status(400).json({
                    message: "Please provide templateName"
                });
            }


        } catch (error) {
            res.status(400).json({
                message: "Something went wrong :("
            });
        };

    }
}