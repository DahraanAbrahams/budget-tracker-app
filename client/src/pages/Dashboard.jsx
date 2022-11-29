import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import TransactionForm from "../components/TransactionForm"
import BudgetForm from "../components/BudgetForm"
import List from "../components/List"
import Spinner from '../components/Spinner'
import { default as api } from '../features/api/apiSlice'

function Dashboard() {

  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { data: budget, isError: isBudgetError, isLoading: isBudgetLoading, error: budgetError } = api.useGetBudgetQuery()
  const { data: transactionData, isError: isTransactionError, isLoading: isTransactionLoading, error: transactionError } = api.useGetTransactionsQuery()
  const [setBudget] = api.useAddBudgetMutation()

  //Filter transactions history
  const [filteredTransactions, setFilteredTransactions] = useState(transactionData || []);
  
  useEffect(() => {
    if (isBudgetError) {
      console.log(budgetError)
    }
    if (isTransactionError) {
      console.log(transactionError)
    }
    if (!user) {
      navigate('/login')
    }
    if (!budget) {
      const defaultBudget = { 'amount': 0 }
      setBudget(defaultBudget).unwrap()
     }
    setFilteredTransactions(transactionData);
    
  }, [user, isBudgetError, isTransactionError, budgetError, transactionError, transactionData, budget, navigate])

  if (isBudgetLoading || isTransactionLoading) {
    return <Spinner />
  }

  const totalExpense = transactionData?.reduce((total, transaction) => { 
    return (total += transaction.amount)
  }, 0)

  const budgetAmount = budget[0].amount
  const remaining = budget[0].amount - totalExpense

  const alert = remaining < budgetAmount * 0.10 ? 'less-than-0' :
                  remaining < budgetAmount * 0.25 ? 'less-than-25-percent' : 
                    remaining < budgetAmount * 0.5 ? 'less-than-50-percent' : 
                      remaining < budgetAmount * 0.75 ? 'less-than-75-percent' : 
          'remaining-amount'
  
  const onSubmitFilter = (event) => {
    const searchResults = transactionData.filter((filteredTransactions) =>
    filteredTransactions.description.toLowerCase().includes(event.target.value)
    );
    setFilteredTransactions(searchResults);
  };

  return (
    <>
      <section className='heading-2'>
        <h1>Welcome {user && user.name}</h1>
        <p>Budget Tracker Dashboard</p>
      </section>
      {/* { console.log(transactionData)}
      { console.log(totalExpense)} */}
      <section className="balances">
        <h1 id='budget'>Budget: <span id='budget-amount'> ${ budgetAmount }</span></h1>
        <h1 id='remaining-balance'>Remaining Balance:
          <span id={alert}> ${remaining}</span></h1>
      </section>

      <section className="dashboard-content">
        {/* Add transaction section */}
        <section className="add-transaction">
          <h4 id='add-transaction-title'>Add Budget</h4>
          <BudgetForm />
          <h4 id='add-transaction-title'>Add Transaction</h4>
          <TransactionForm />
        </section>

        <section className="history-list">
          <div className="list-container">
              {/* search transaction */}
              <h4 id='history-list-title'>Search Transaction</h4>
        
              <div className='form-group'>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Search for transactions'
                    onChange={onSubmitFilter} 
                    maxLength = {25}
                />      
                </div>
            <h4 id='history-list-title'>History List</h4>
            <List filteredTransactions={filteredTransactions} />
          </div>
        </section>
      </section>
    </>
  )
}

export default Dashboard