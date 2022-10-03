const hre = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage;

  beforeEach(async function () {
    simpleStorageFactory = await hre.ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), "0");
    // expect(currentValue.toString().to.equal("0")); // similar to assert above
  });

  it("Should update when we call store", async function () {
    const transactionResponse = await simpleStorage.store("7");
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), "7");
  });
});
