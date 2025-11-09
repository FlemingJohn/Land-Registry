
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct Property {
        uint256 id;
        string propertyAddress;
        address owner;
        uint256 area;
        string propertyType;
        uint256 registrationDate;
        uint256 value;
    }

    struct Transaction {
        uint256 id;
        uint256 propertyId;
        address fromOwner;
        address toOwner;
        uint256 timestamp;
        uint256 value;
    }

    uint256 private nextPropertyId = 1;
    uint256 private nextTransactionId = 1;

    mapping(uint256 => Property) public properties;
    mapping(address => uint256[]) public ownerProperties;
    mapping(uint256 => Transaction[]) public propertyTransactions;

    event PropertyRegistered(
        uint256 indexed id,
        string propertyAddress,
        address indexed owner,
        uint256 value
    );

    event PropertyTransferred(
        uint256 indexed propertyId,
        address indexed from,
        address indexed to,
        uint256 value,
        uint256 timestamp
    );

    modifier onlyOwner(uint256 _propertyId) {
        require(
            properties[_propertyId].owner == msg.sender,
            "You are not the owner of this property"
        );
        _;
    }

    function registerProperty(
        string memory _propertyAddress,
        uint256 _area,
        string memory _propertyType,
        uint256 _value
    ) public {
        uint256 propertyId = nextPropertyId++;
        properties[propertyId] = Property({
            id: propertyId,
            propertyAddress: _propertyAddress,
            owner: msg.sender,
            area: _area,
            propertyType: _propertyType,
            registrationDate: block.timestamp,
            value: _value
        });
        ownerProperties[msg.sender].push(propertyId);
        emit PropertyRegistered(
            propertyId,
            _propertyAddress,
            msg.sender,
            _value
        );
    }

    function transferProperty(uint256 _propertyId, address _to)
        public
        onlyOwner(_propertyId)
    {
        require(_to != address(0), "Invalid new owner address");
        Property storage property = properties[_propertyId];
        address fromOwner = property.owner;

        // Remove property from old owner's list
        uint256[] storage oldOwnerProperties = ownerProperties[fromOwner];
        for (uint256 i = 0; i < oldOwnerProperties.length; i++) {
            if (oldOwnerProperties[i] == _propertyId) {
                oldOwnerProperties[i] = oldOwnerProperties[oldOwnerProperties.length - 1];
                oldOwnerProperties.pop();
                break;
            }
        }

        // Add property to new owner's list
        property.owner = _to;
        ownerProperties[_to].push(_propertyId);

        // Record the transaction
        Transaction memory newTransaction = Transaction({
            id: nextTransactionId++,
            propertyId: _propertyId,
            fromOwner: fromOwner,
            toOwner: _to,
            timestamp: block.timestamp,
            value: property.value
        });
        propertyTransactions[_propertyId].push(newTransaction);

        emit PropertyTransferred(
            _propertyId,
            fromOwner,
            _to,
            property.value,
            block.timestamp
        );
    }

    function getProperty(uint256 _propertyId)
        public
        view
        returns (
            uint256,
            string memory,
            address,
            uint256,
            string memory,
            uint256,
            uint256
        )
    {
        Property memory p = properties[_propertyId];
        return (
            p.id,
            p.propertyAddress,
            p.owner,
            p.area,
            p.propertyType,
            p.registrationDate,
            p.value
        );
    }

    function getTransactions(uint256 _propertyId)
        public
        view
        returns (Transaction[] memory)
    {
        return propertyTransactions[_propertyId];
    }
}
