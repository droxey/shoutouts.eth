$(document).ready(function () {
    // Connect to the contract network via Web3.
    ShoutoutContract.detectNetwork();

    // Create an IPFS node and connect to the network.
    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });
    window.node = node;

    // Show the status on the page.
    $('#ipfs-status').html(node.isOnline() ? 'online' : 'offline');

    // Capture the form submission event.
    $("#shoutout-form").submit(function (e) {
        // Run the code below instead of performing the default form submission action.
        e.preventDefault();

        // Fetch the deployed contract, then use it's instance to call functions defined within.
        ShoutoutContract.deployed().then(function (instance) {
            // Compile the metadata.
            var metadata = {
                "name": "shoutouts.eth",
                "description": `${$("#from").val()} sent 1 SHOUT`,
                "to": $("#to").val(),
                "message": $("#message").val(),
                "image": "https://ipfs.io/ipfs/QmRGhvqTPvx8kgMSLFdPaCysKvhtP5GV5MsKDmTx3v2QxT",
                "timestamp": new Date().toUTCString()
            };

            // Add the metadata to IPFS first, because our contract requires a
            // valid URL for the metadata address.
            node.add(metadata).then(function (cid) {
                console.log('[IPFS]', 'Metadata stored:', cid);

                // Once the file is added, then we can send a shoutout!
                ShoutoutContract.awardItem(metadata.to, `https://ipfs.io/ipfs/${cid}`);
            });
        });
    });
});

function initIPFS() {

    console.log(`Node status: ${node.isOnline() ? 'online' : 'offline'}`);
    return node;
}

async function addFileOnIPFS(metadata) {

    console.log('successfully stored', cid)
}
