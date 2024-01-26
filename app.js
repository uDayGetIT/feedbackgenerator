const contractAddress = '0x1110beb0e8Eff98A1048Bc09c2f787EeDAE3b35b'; // Replace with your contract address
const contractABI = [ // Replace with your contract ABI
    // ... (Your ABI here)
];

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
    const web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractABI, contractAddress);
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
            await contract.methods.lockETH(amount).send({ from: window.ethereum.selectedAddress });
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
