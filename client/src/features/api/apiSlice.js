import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURI = 'http://localhost:5001'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery(
        {
            baseUrl: baseURI,
            prepareHeaders: async (headers, { getState }) => { 
                const token = getState().auth.user.token
                if (token) {
                    headers.set('authorization', `Bearer ${token}`)
                  }
              
                  return headers
            }
        }),
    endpoints: builder => ({
        
        //Get Budget - GET http://localhost:5001/api/budget
        getBudget: builder.query({
            query: () => '/api/budget', //Makes default GET request to URI/endpoint
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

        // //Update budget - PUT http://localhost:5001/api/budget
        // updateBudget: builder.mutation({
        //     query: (budgetID) => ({
        //         url: `/api/budget/${budgetID.id}`,
        //         method: 'PUT',
        //         body: budgetID
        //     }),
        //     invalidatesTags: ['budget']
        // }),

        //Get transactions - GET http://localhost:5001/api/transactions
        getTransactions: builder.query({
            query: () => '/api/transactions', //Makes default GET request to URI/endpoint
            providesTags: ['transactions'] //group data together to update the Transaction History liste
        }), //GET http://localhost:5001/api/transactions

        //Add new transaction - POST http://localhost:5001/api/transactions
        createTransaction: builder.mutation({
            query: (transactionData) => ({
                url: '/api/transactions',
                method: 'POST',
                body: transactionData
            }),
            invalidatesTags: ['transactions'] //Everytime we click on this method, the apiSlice will automatically call the 
            //Get transactions api () to automatically. So we don't have to manually update the data
        }),

         //Delete transaction - DELETE http://localhost:5001/api/transactions
         deleteTransaction: builder.mutation({
            query: (transactionID) => ({
                url: `/api/transactions/${transactionID.id}`, //  http://localhost:5001/api/transaction/:id
                method: 'DELETE',
                body: transactionID
             }),
             invalidatesTags: ['transactions'],
         })
    })
})

export default apiSlice