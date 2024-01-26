let web3;
let contract;

document.addEventListener('DOMContentLoaded', async () => {
    await connectWallet();
    initializeContract();
    updateUI();
});

async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            const account = accounts[0];

            document.getElementById('account').innerText = `Account: ${account}`;
        } catch (error) {
            console.error(error);
        }
    } else {
        console.error('MetaMask is not installed');
    }
}

function initializeContract() {
    const provider = window.ethereum;
    web3 = new Web3(provider);
    contract = new web3.eth.Contract( [ { "inputs": [], "name": "claimYield", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "lockETH", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_dminToken", "type": "address" }, { "internalType": "address", "name": "_owner", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "ETHLocked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_newValue", "type": "uint256" } ], "name": "setTotalValueLocked", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_newPercentage", "type": "uint256" } ], "name": "setYieldPercentage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "yieldAmount", "type": "uint256" } ], "name": "YieldClaimed", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "_user", "type": "address" } ], "name": "calculateYield", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "dminToken", "outputs": [ { "internalType": "contract IERC20", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "lastYieldClaim", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "lockedETH", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalValueLocked", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "yieldPercentage", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ] ,'0x1110beb0e8Eff98A1048Bc09c2f787EeDAE3b35b' );
    console.log(contract);
}

async function updateUI() {
    const totalValueLocked = await contract.methods.totalValueLocked().call();
    const yieldPercentage = await contract.methods.yieldPercentage().call();

    document.getElementById('totalValue').innerText = totalValueLocked;
    document.getElementById('yieldPercentage').innerText = yieldPercentage;
}

async function lockETH() {
    const amount = prompt('Enter the amount of ETH to lock:');
    if (amount) {
        try {
            const amountInWei = web3.utils.toWei(amount, 'ether');
            await contract.methods.lockETH(amountInWei).send({ from: window.ethereum.selectedAddress });
            updateUI();
        } catch (error) {
            console.error(error);
        }
    }
}

async function claimYield() {
    try {
        await contract.methods.claimYield().send({ from: window.ethereum.selectedAddress });
        updateUI();
    } catch (error) {
        console.error(error);
    }
}
