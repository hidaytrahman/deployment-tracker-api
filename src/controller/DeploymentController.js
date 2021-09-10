const DeploymentSchema = require('../model/Deployment');

module.exports = {

    /*========== Get Deployment =============*/
    getDeployment: async (req, res) => {
        try {
            const data = await DeploymentSchema.find();
            res.json(data);

        } catch (err) {
            res.status(400).json({
                message: "Something went wrong :("
            });
        }

    },


    /*========== Create Deployment =============*/
    addDeployment: async (req, res) => {

        try {
            const { URL, templateName, version } = req.body;

            // check if all fields are present
            if (URL && templateName && version) {

                // check if template is already exists
                const data = await DeploymentSchema.findOne({ templateName: templateName });

                if (!data) {
                    const doc = new DeploymentSchema({
                        name: URL,
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
                    console.log(' data.version ', data.version);

                    const versionExists = data.version.filter((item) => item === version);

                    if (versionExists && versionExists.length > 0) {
                        return res.status(400).json({
                            message: `This version (${version}) is already exists`
                        })
                    } else {
                        const filter = { templateName };
                        const update = { version: [...data.version, version] };

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