const DataContract = artifacts.require("./DataContract.sol");

require("chai").use(require("chai-as-promised")).should();

contract("DataContract", ([deployer, borrower]) => {
  let dataContract;

  before(async () => {
    dataContract = await DataContract.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await dataContract.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await dataContract.name();
      assert.equal(name, "Data Contract");
    });
  });

  describe("Offer A Contract", async () => {
    let result, fileCount;
    const fileHash = "QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb";
    const length = 3600;
    const stakingBalance = 300;
    const fileDescription = "DescriptionOfTheFile";
    const owner = "0xda5af3207a51295a5ae014259ad326de04c0558e";

    before(async () => {
      result = await dataContract.OfferAContract(
        owner,
        fileDescription,
        length,
        stakingBalance,
        fileHash,
        { from: borrower }
      );
      contractCount = await dataContract.contractCount();
    });

    //check event
    it("upload file", async () => {
      // SUCESS
      assert.equal(contractCount, 1);
      const event = result.logs[0].args;
      console.log(event);
      assert.equal(
        event.Id.toNumber(),
        contractCount.toNumber(),
        "Id is correct"
      );
      assert.equal(event.fileHash, fileHash, "Hash is correct");
      assert.equal(
        event.Description,
        fileDescription,
        "Description is correct"
      );
      assert.equal(event.borrower, borrower, "borrower is correct");

      //check from Struct
      it("lists file", async () => {
        const file = await dataContract.files(contractCount);
        assert.equal(
          file.fileId.toNumber(),
          contractCount.toNumber(),
          "id is correct"
        );
        assert.equal(file.fileHash, fileHash, "Hash is correct");
        assert.equal(
          file.fileDescription,
          fileDescription,
          "description is correct"
        );
        assert.equal(file.borrower, borrower, "borrower is correct");
      });
    });
  });
});
