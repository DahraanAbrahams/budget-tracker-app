import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import TransactionForm from "../components/TransactionForm"
import BudgetForm from "../components/BudgetForm"
import List from "../components/List"
import Spinner from '../components/Spinner'
import { default as api } from '../features/api/apiSlice'



function Dashboard() {

  const navigate = useNavigate()
  // const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { isError, isLoading, error } = api.useGetTransactionsQuery()
  
  useEffect(() => { 
    if (isError) { 
      console.log(error)
    }
    if (!user) {
      navigate('/login') //If user isn't logged in, return the user to the login page
    }
    
    // dispatch(getTransactions())
  }, [user, isError, error, navigate])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading-2'>
        <h1>Welcome {user && user.name}</h1>
        <p>Budget Tracker Dashboard</p>
      </section>

      <section className="balances">
        <h1 id='budget'>Budget: <span id='budget-amount'> ${ 3000 }</span></h1>
        <h1 id='remaining-balance'>Remaining Balance: <span id='remaining-amount'> ${ 500 }</span></h1>
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
          <h4 id='history-list-title'>History List</h4>
          <div className="list-container">
            <List />
          </div>
        </section>
      </section>
    </>
  )
}

export default Dashboard