import { ethers } from "hardhat";
// const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const ScholarshipsAndGrants = await ethers.getContractFactory("ScholarshipsAndGrants");
  const scholarshipContract = await ScholarshipsAndGrants.deploy();
  await scholarshipContract.deployed();

  console.log("ScholarshipsAndGrants deployed to:", scholarshipContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
