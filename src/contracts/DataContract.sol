pragma solidity ^0.5.0;

contract DataContract {
    string public name = "Data Contract";
    uint256[] public accessHistory;
    uint256 public contractCount = 0;
    mapping(uint256 => Contract) public contracts;
    uint256[] public temp;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;

    struct Contract {
        uint256 Id;
        address payable owner;
        address borrower;
        string Description;
        uint256 createdAt;
        bool effective;
        bool signed;
        uint256 length;
        uint256 stakingBalance;
        string fileHash;
    }

    event ContractOffered(
        uint256 Id,
        address payable owner,
        address borrower,
        string Description,
        uint256 uploadTime,
        bool effective,
        string fileHash
    );

    event ContractSigned(uint256 Id, uint256 Date, string fileHash);

    constructor() public {}

    function OfferAContract(
        address payable _owner,
        string memory _fileDescription,
        uint256 _length,
        string memory _fileHash
    ) public payable {
        // Increment file id
        contractCount++;

        // Add File to the contract
        contracts[contractCount] = Contract(
            contractCount,
            _owner,
            msg.sender,
            _fileDescription,
            now,
            false,
            false,
            _length,
            msg.value,
            _fileHash
        );
        // Trigger an event
        emit ContractOffered(
            contractCount,
            _owner,
            msg.sender,
            _fileDescription,
            now,
            false,
            _fileHash
        );
    }

    // function deposit(uint256 amount) public payable {
    //     require(msg.value == amount);
    // }

    // function withdraw() public {
    //     msg.sender.transfer(address(this).balance);
    // }

    // function getBalance() public view returns (uint256) {
    //     return address(this).balance;
    // }

    function SignAContract(uint256 id) public {
        contracts[id].signed = true;
        contracts[id].effective = true;
        msg.sender.transfer(contracts[id].stakingBalance);
        emit ContractSigned(id, now, contracts[id].fileHash);
    }

    function AccessData(uint256 id) public returns (bool) {
        if (contracts[id].effective == true) {
            accessHistory.push(id);
            return true;
        } else return false;
    }

    function getAccessHistory() public returns (uint256[] memory) {
        return accessHistory;
    }
}
