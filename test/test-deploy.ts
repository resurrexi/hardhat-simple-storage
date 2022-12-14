import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", function () {
  let simpleStorageFactory: SimpleStorage__factory,
    simpleStorage: SimpleStorage;

  beforeEach(async function () {
    simpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory;
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

  it("Should update when adding a person", async function () {
    const transactionResponse = await simpleStorage.addPerson("Lee", "9");
    await transactionResponse.wait(1);

    const person = await simpleStorage.people(0);
    assert.equal(person.favoriteNumber, 9);
    assert.equal(person.name, "Lee");
    const favoriteNumber = await simpleStorage.nameToFavoriteNumber("Lee");
    assert.equal(favoriteNumber, 9);
  });
});
