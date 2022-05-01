pragma solidity ^0.5.0;
import "./Storage.sol";
import 'antd/dist/antd.css';

contract DataContract {
    string public name = "Data Contract";
    address[] public borrowers;
    uint256 public contractCount = 0;
    mapping(uint256 => Contract) public contracts;

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

    constructor() public {}

    function OfferAContract(
        address payable _owner,
        string memory _fileDescription,
        uint256 _length,
        uint256 _stakingBalance,
        string memory _fileHash
    ) public {
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
            _stakingBalance,
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

    function SignAContract() public {

    }
}
