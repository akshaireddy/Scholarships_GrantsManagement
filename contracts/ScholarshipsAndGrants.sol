// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ScholarshipsAndGrants {
    address public owner;
    
    struct Scholarship {
        address recipient;
        uint256 amount;
        bool isApproved;
    }
    
    Scholarship[] public scholarships;
    
    mapping(address => uint256) public balances;
    
    event ScholarshipCreated(address indexed recipient, uint256 amount);
    event ScholarshipApproved(uint256 indexed scholarshipIndex);
    event FundsDeposited(address indexed sender, uint256 amount);
    event FundsWithdrawn(address indexed recipient, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function createScholarship(address _recipient, uint256 _amount) external onlyOwner {
        require(_recipient != address(0), "Invalid recipient address");
        require(_amount > 0, "Invalid scholarship amount");
        
        scholarships.push(Scholarship({
            recipient: _recipient,
            amount: _amount,
            isApproved: false
        }));
        
        emit ScholarshipCreated(_recipient, _amount);
    }
    
    function approveScholarship(uint256 _scholarshipIndex) external onlyOwner {
        require(_scholarshipIndex < scholarships.length, "Invalid scholarship index");
        require(!scholarships[_scholarshipIndex].isApproved, "Scholarship already approved");
        
        scholarships[_scholarshipIndex].isApproved = true;
        
        address recipient = scholarships[_scholarshipIndex].recipient;
        uint256 amount = scholarships[_scholarshipIndex].amount;
        balances[recipient] += amount;
        
        emit ScholarshipApproved(_scholarshipIndex);
    }
    
    function depositFunds() external payable {
        require(msg.value > 0, "You need to send some Ether");
        balances[msg.sender] += msg.value;
        
        emit FundsDeposited(msg.sender, msg.value);
    }
    
    function withdrawFunds(uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        require(_amount > 0, "Invalid withdrawal amount");
        
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        
        emit FundsWithdrawn(msg.sender, _amount);
    }
    
    function getScholarshipCount() external view returns (uint256) {
        return scholarships.length;
    }
}
