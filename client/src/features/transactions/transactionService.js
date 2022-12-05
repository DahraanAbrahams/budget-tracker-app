import axios from 'axios'

const API_URL = 'http://localhost:5001/api/transactions/'

//Create new transaction
const createTransaction = async (transactionData, token) => { 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, transactionData, config)

    return response.data
}

//Get users transactions
const getTransactions = async (token) => { 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete user transaction
const deleteTransaction = async (transactionID, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + transactionID, config)
  
    return response.data
}
  

const transactionService = {
    createTransaction,
    getTransactions,
    deleteTransaction,
}

export default transactionService