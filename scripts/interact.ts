const { ethers } = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  const contractAddress = process.env.CONTRACT_ADDRESS;
  const contractABI = JSON.parse(fs.readFileSync("artifacts/contracts/ScholarshipsAndGrants.sol/ScholarshipsAndGrants.json")); // Replace with actual ABI file path
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  // Interact with the contract here
  // For example, call functions or send transactions

  // Example: Create a scholarship
  const recipient = "0xRecipientAddressHere";
  const amount = ethers.utils.parseEther("1"); // 1 Ether in wei
  await contract.createScholarship(recipient, amount);

  // Example: Approve a scholarship
  const scholarshipIndex = 0; // Assuming you want to approve the first scholarship
  await contract.approveScholarship(scholarshipIndex);

  // Example: Deposit funds
  const depositAmount = ethers.utils.parseEther("0.5"); // 0.5 Ether in wei
  await contract.depositFunds({ value: depositAmount });

  // Example: Withdraw funds
  const withdrawalAmount = ethers.utils.parseEther("0.2"); // 0.2 Ether in wei
  await contract.withdrawFunds(withdrawalAmount);

  // Example: Get scholarship count
  const scholarshipCount = await contract.getScholarshipCount();
  console.log("Scholarship count:", scholarshipCount.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
