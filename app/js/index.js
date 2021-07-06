import Web3 from "web3";
import shoutoutArtifact from "../../build/contracts/ShoutoutContract.json";
import fleek from '@fleekhq/fleek-storage-js';


// Create a Javascript class to keep track of all the things
// we can do with our contract.
// Credit: https://github.com/truffle-box/webpack-box/blob/master/app/src/index.js
const App = {
    web3: null,
    account: null,
    shoutoutContract: null,

    start: async function () {
        // Connect to Web3 instance.
        const { web3 } = this;

        try {
            // Get contract instance
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = shoutoutArtifact.networks[networkId];
            this.shoutoutContract = new web3.eth.Contract(
                shoutoutArtifact.abi,
                deployedNetwork.address,
            );

            // Get accounts
            const accounts = await web3.eth.getAccounts();
            this.account = accounts[0];

            this.refreshBalance();
        } catch (error) {
            console.error("Could not connect to contract or chain: ", error);
        }
    },

    refreshBalance: async function () {
        const { balanceOf } = this.shoutoutContract.methods;
        const balance = await balanceOf(this.account).call();

        $('#balance').html(balance);
        $('#total-shouts').show();
        $('my-account').html(this.account);
    },

    storeMetadata: async function (name, to, message) {
        // Build the metadata.
        var metadata = {
            "name": "shoutouts.eth",
            "description": `Shoutout from ${name}`,
            "to": to,
            "message": message,
            "image": "https://ipfs.io/ipfs/QmRGhvqTPvx8kgMSLFdPaCysKvhtP5GV5MsKDmTx3v2QxT",
            "timestamp": new Date().toUTCString()
        };

        const upload = {
            apiKey: 'KlBFeA+IOCSibbOtRjqN9Q==',
            apiSecret: 'k3X0fEIDpMiOw6y2x6OayqJXOvxnr4eT29Gwfb6IG0M=',
            key: `metadata/${metadata.timestamp}}.json`,
            data: metadata.toString(),
        };

        this.setStatus("Sending shoutout... please wait!");

        // Add the metadata to IPFS first, because our contract requires a
        // valid URL for the metadata address.
        const result = await fleek.upload(upload);

        // Once the file is added, then we can send a shoutout!
        this.awardItem(to, result.publicUrl);
    },

    awardItem: async function (to, metadataURL) {
        const { awardItem } = this.shoutoutContract.methods;
        await awardItem(to, metadataURL).send({ from: this.account });

        this.setStatus("Shoutout sent!");
        this.refreshBalance();
    },

    setStatus: function (message) {
        $('#status').html(message);
    }
};

window.App = App;

$(document).ready(function () {
    // Detect Web3 provider.
    if (window.ethereum) {
        // use MetaMask's provider
        App.web3 = new Web3(window.ethereum);
        window.ethereum.enable(); // get permission to access accounts
    } else {
        console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",);
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        App.web3 = new Web3(
            new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
        );
    }
    // Initialize Web3 connection.
    window.App.start();

    // Capture the form submission event when it occurs.
    $("#shoutout-form").submit(function (e) {
        // Run the code below instead of performing the default form submission action.
        e.preventDefault();

        // Capture form data and create metadata from the submission.
        const name = $("#from").val();
        const to = $("#to").val();
        const message = $("#message").val();

        window.App.storeMetadata(name, to, message);
    });
});
