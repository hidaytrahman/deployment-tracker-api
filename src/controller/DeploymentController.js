const DeploymentSchema = require('../model/Deployment');

module.exports = {

    /*========== Get Deployment =============*/
    getDeployment: async (req, res) => {
        const data = await DeploymentSchema.find();
        res.json(data);
    },


    /*========== Create Deployment =============*/
    addDeployment: async (req, res) => {

        const { URL, templateName, version } = req.body;



        // check if all fields are present
        if (URL && templateName && version) {

            const data = await DeploymentSchema.findOne({ templateName: templateName });

            console.log(' data ', data);

            if (!data) {
                const doc = new DeploymentSchema({
                    name: URL,
                    templateName: templateName,
                    version: [version]
                });

                console.log(version)
                console.log('...version ',[version])


                //save in to the DB
                doc.save((err, result) => {

                    try {

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
                        console.log('result ', result);
                    }
                    catch (error) {
                        res.status(400).json({
                            message: error.message
                        });
                    };

                });
            } else {

                const filter = {templateName};
                const update = { version: [...data.version, version] };

                let doc = await DeploymentSchema.findOneAndUpdate(filter, update);

                console.log('doc ' , doc)
                console.log('[...data.version, version] ',[...data.version, version])
                res.status(200).json({
                    message: "Update version here"
                });
            }



        } else {
            return res.status(400).json({
                message: "All fields are mandatory!"
            })
        }
    },


    /*========== delete Deployment =============*/
    deleteDeployment: (req, res) => {
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

    }
}