// import TransactionItem from "./TransactionItem"
import { AiOutlineClose } from 'react-icons/ai'
import { default as api } from '../features/api/apiSlice'
import Spinner from './Spinner'

function List() {

  // console.log(api.useGetTransactionsQuery())
  const { data, isFetching, isSuccess, isError, isLoading, error } = api.useGetTransactionsQuery()
  const [deleteTransaction] = api.useDeleteTransactionMutation()
  let Transactions

  const deleteItem = (event) => { 
    if (!event) return 0
    deleteTransaction({ id: event })
  }

  if (isFetching && isLoading) {
    return <Spinner />
  }
  else if (isError) {
    console.log(error)
  }
  else if (isSuccess) { 
    Transactions = data.map((transaction) => (
      // console.log(transaction._id)
      <TransactionItem key={transaction._id}  transaction={transaction} deleteItem={ deleteItem } styleBorder={styleBorder} />
    ))
  }

  return (
    <div className="history-list-item">
      
      {data.length > 0 ?
        Transactions :
        (<h3 id='no-transactions-message'>There are no transactions to display! Start by adding transactions...</h3>)}
    </div>
  )
}


function TransactionItem({transaction, styleBorder, deleteItem }) {
  return (
    // console.log(transaction._id)
    <div className="list-item" style={{borderRight: `0.5rem solid ${styleBorder(transaction.type)}`}}>
      <AiOutlineClose onClick={(e) => deleteItem(transaction._id)} fontSize={15} style={{color: `${styleBorder(transaction.type)}`}}/>
          <span id='transaction-date'>{new Date(transaction.createdAt).toLocaleString().split(', ')[0]}</span>
          <span id='transaction-description'>{transaction.description}</span>
          <span id='transaction-type'>{transaction.type}</span>
          <span id='transaction-amount'>${transaction.amount}</span>
      </div>
  )
} 

function styleBorder(type) {
  if (type === 'Expense') //
  return '#005F73'
  else if (type === 'Savings')
  return '#EE9B00'
  else if (type === 'Investment')
  return '#BB3E03'
  else
  return '#FFFFFF'
}

export default List