const ShoutoutContract = artifacts.require("ShoutoutContract");

module.exports = function (deployer) {
    deployer.deploy(ShoutoutContract);
}
