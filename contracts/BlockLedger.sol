// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BlockLedger
 * @dev Immutable accounting ledger for recording transactions on-chain
 */
contract BlockLedger {
    // Transaction structure
    struct Transaction {
        uint256 id;
        address creator;
        string description;
        uint256 amount;
        bool isIncome; // true for income, false for expense
        uint256 timestamp;
        string category;
    }

    // Mapping to store transactions
    mapping(uint256 => Transaction) public transactions;
    
    // Mapping to store user's transaction IDs
    mapping(address => uint256[]) public userTransactions;
    
    // Total transaction count
    uint256 public transactionCount;
    
    // Events
    event TransactionRecorded(
        uint256 indexed id,
        address indexed creator,
        string description,
        uint256 amount,
        bool isIncome,
        uint256 timestamp,
        string category
    );
    
    event BalanceUpdated(address indexed user, int256 newBalance);
    
    /**
     * @dev Record a new transaction
     * @param _description Description of the transaction
     * @param _amount Amount in wei (will be converted to readable format off-chain)
     * @param _isIncome true for income, false for expense
     * @param _category Category of the transaction
     */
    function recordTransaction(
        string memory _description,
        uint256 _amount,
        bool _isIncome,
        string memory _category
    ) public {
        require(_amount > 0, "Amount must be greater than 0");
        require(bytes(_description).length > 0, "Description cannot be empty");
        
        transactionCount++;
        
        Transaction memory newTransaction = Transaction({
            id: transactionCount,
            creator: msg.sender,
            description: _description,
            amount: _amount,
            isIncome: _isIncome,
            timestamp: block.timestamp,
            category: _category
        });
        
        transactions[transactionCount] = newTransaction;
        userTransactions[msg.sender].push(transactionCount);
        
        emit TransactionRecorded(
            transactionCount,
            msg.sender,
            _description,
            _amount,
            _isIncome,
            block.timestamp,
            _category
        );
    }
    
    /**
     * @dev Get a specific transaction by ID
     * @param _id Transaction ID
     * @return transactionId Transaction ID
     * @return creator Address of transaction creator
     * @return description Transaction description
     * @return amount Transaction amount
     * @return isIncome Whether transaction is income
     * @return timestamp Transaction timestamp
     * @return category Transaction category
     */
    function getTransaction(uint256 _id) public view returns (
        uint256 transactionId,
        address creator,
        string memory description,
        uint256 amount,
        bool isIncome,
        uint256 timestamp,
        string memory category
    ) {
        require(_id > 0 && _id <= transactionCount, "Transaction does not exist");
        Transaction memory transaction = transactions[_id];
        return (
            transaction.id,
            transaction.creator,
            transaction.description,
            transaction.amount,
            transaction.isIncome,
            transaction.timestamp,
            transaction.category
        );
    }
    
    /**
     * @dev Get all transaction IDs for a user
     * @param _user Address of the user
     * @return Array of transaction IDs
     */
    function getUserTransactionIds(address _user) public view returns (uint256[] memory) {
        return userTransactions[_user];
    }
    
    /**
     * @dev Get user's balance (income - expenses)
     * @param _user Address of the user
     * @return userBalance Net balance (can be negative)
     */
    function getUserBalance(address _user) public view returns (int256 userBalance) {
        uint256[] memory txIds = userTransactions[_user];
        userBalance = 0;
        
        for (uint256 i = 0; i < txIds.length; i++) {
            Transaction memory transaction = transactions[txIds[i]];
            if (transaction.isIncome) {
                userBalance += int256(transaction.amount);
            } else {
                userBalance -= int256(transaction.amount);
            }
        }
        
        return userBalance;
    }
    
    /**
     * @dev Get total number of transactions
     * @return Total transaction count
     */
    function getTotalTransactions() public view returns (uint256) {
        return transactionCount;
    }
    
    /**
     * @dev Get transaction count for a specific user
     * @param _user Address of the user
     * @return Number of transactions
     */
    function getUserTransactionCount(address _user) public view returns (uint256) {
        return userTransactions[_user].length;
    }
    
    /**
     * @dev Get multiple transactions by IDs
     * @param _ids Array of transaction IDs
     * @return Array of Transaction structs
     */
    function getTransactions(uint256[] memory _ids) public view returns (Transaction[] memory) {
        Transaction[] memory result = new Transaction[](_ids.length);
        
        for (uint256 i = 0; i < _ids.length; i++) {
            require(_ids[i] > 0 && _ids[i] <= transactionCount, "Transaction does not exist");
            result[i] = transactions[_ids[i]];
        }
        
        return result;
    }
}

