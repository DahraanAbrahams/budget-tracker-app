import { useForm } from 'react-hook-form'
import { default as api } from '../features/api/apiSlice'


const BudgetForm = () => {

    const { register, handleSubmit, resetField, formState: { errors } } = useForm()
    const [addBudget] = api.useAddBudgetMutation()

    const onSubmit = async (data) => {
        console.log(data)
        if (!data) return {}
        await addBudget(data).unwrap() 
        
        resetField('amount')
    }
    
  return (
      <>
        <section className='form budget-form'>
            <form id='budget-form' onSubmit={handleSubmit(onSubmit)}>
                <div id='budget-form-input' className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Enter in your budget'
                        {...register('budget')}
                      /> 
                    {errors.budget && errors.budget.type === "required" && (
                    <p className="form-error-message">Please add budget</p>
                )}    
                </div>
                <div id='budget-form-button' className='form-group'>
                <button type='submit' className='btn btn-block'>
                    Budget
                </button>
                </div>
            </form>
        </section>

    </>
  )
}

export default BudgetForm