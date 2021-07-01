$(document).ready(function () {
    ShoutoutContract.detectNetwork();

    $("#shoutout-form").submit(function (e) {
        e.preventDefault();

        ShoutoutContract.deployed().then(function (instance) {
            var metadata = {
                "name": "shoutouts.eth",
                "from": $("#sender").val(),
                "to": $("#receipient").val(),
                "description": $("#message").val(),
                "image": "https://ipfs.io/ipfs/QmRGhvqTPvx8kgMSLFdPaCysKvhtP5GV5MsKDmTx3v2QxT"
            };

            // TODO: Save metadata to json file and get URL back from IPFS.
            // We will learn how to do this on tuesday!

            // Send the request to award a shoutout.
            ShoutoutContract.awardItem(receipient, "URL_TO_IPFS_METADATA_JSON");


            // TODO: Once truffle-default-builder installs
            // 1. Run truffle serve
            // 2. Visit localhost:8080
        });
    });
});
