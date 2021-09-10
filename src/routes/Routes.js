const DeploymentController = require("../controller/DeploymentController");
module.exports = (app) => {

    /*========== Get Deployment =============*/
    app.get("/deployment", DeploymentController.getDeployment);


    /*========== Create Deployment =============*/
    app.post("/deployment", DeploymentController.addDeployment);


    /*========== delete Deployment =============*/
    app.delete("/deployment", DeploymentController.deleteDeployment);

}