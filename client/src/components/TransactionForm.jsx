import { useForm } from 'react-hook-form'
import { useCreateTransactionMutation } from '../features/api/transactionsApi' 


const TransactionForm = () => {

    const { register, handleSubmit, resetField, formState: { errors } } = useForm()
    const [createTransaction] = useCreateTransactionMutation()

    const onSubmit = async (data) => {
        if (!data) return {}
        await createTransaction(data).unwrap() 
        
        resetField('description') 
        resetField('amount')
    }
    
  return (
      <>
        <section className='form transaction-form'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Enter description of transaction'
                    {...register('description', {required: true})}
                />
                {errors.description && errors.description.type === "required" && (
                    <p className="form-error-message">Please enter transaction description</p>
                )}      
                </div>
                <div className='form-group'>
                <select
                    type='text'
                    className='form-control'
                    placeholder='Select transaction type'
                    {...register('type')}
                >
                    <option value='Expense' default>Expense</option>                 
                    <option value='Savings'>Savings</option>          
                    <option value='Investment' >Investment</option>          
                </select>
                </div>
                <div className='form-group'>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Enter amount of transaction'
                   {...register('amount', {required: true})}
                />
                {errors.amount && errors.amount.type === "required" && (
                    <p className="form-error-message">Please enter the transaction amount</p>
                )}        
                </div>
                <div className='form-group'>
                <button type='submit' className='btn btn-block'>
                    Add Transaction
                </button>
                </div>
            </form>
        </section>

    </>
  )
}

export default TransactionForm