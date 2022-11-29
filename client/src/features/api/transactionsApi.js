import { default as baseApi } from './baseApi'

export const transactionsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        
        //Get transactions - GET http://localhost:5001/api/transactions
        getTransactions: builder.query({
            query: () => ({ url: '/api/transactions',}), //Makes default GET request to URI/endpoint
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

export const { useGetTransactionsQuery,
               useCreateTransactionMutation,
               useDeleteTransactionMutation
              } = transactionsApi