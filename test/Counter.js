//Tests go here
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", () => {
  let counter;

  beforeEach(async () => {
    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy("My Counter", 1);
  });

  describe("Deployment", () => {
    it("stores the count", async () => {
      const count = await counter.count();
      expect(count).to.equal(1);
    });

    it("sets the initial name", async () => {
      //Fetch the count
      const count = await counter.name();
      expect(count).to.equal("My Counter");
    });
  });

  describe("Counting", () => {
    let transaction;
    it("increments the counter", async () => {
      transaction = await counter.increment();
      await transaction.wait();

      expect(await counter.count()).to.equal(2);

      transaction = await counter.increment();
      await transaction.wait();

      expect(await counter.count()).to.equal(3);
    });

    it("decrements the count", async () => {
      transaction = await counter.decrement();
      await transaction.wait();
      expect(await counter.count()).to.equal(0);

      await expect(counter.decrement()).to.be.reverted;
    });

    it("updates the name", async () => {
      transaction = await counter.setName("New Counter");
      await transaction.wait();
      expect(await counter.name()).to.equal("New Counter");
    });
  });
});
