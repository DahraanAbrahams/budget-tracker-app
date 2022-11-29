import { default as baseApi } from './baseApi'

export const budgetApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        
        //Get Budget - GET http://localhost:5001/api/budget
        getBudget: builder.query({
            query: () => ({ url: '/api/budget',}), //Makes default GET request to URI/endpoint
            providesTags: ['budget']
        }), //GET http://localhost:5001/api/budget

        //Add new budget - POST http://localhost:5001/api/budget
        addBudget: builder.mutation({
            query: (budgetData) => ({
                url: '/api/budget',
                method: 'POST',
                body: budgetData
            }),
            invalidatesTags: ['budget']
        }),
    })
})

export const { useGetBudgetQuery, useAddBudgetMutation, } = budgetApi