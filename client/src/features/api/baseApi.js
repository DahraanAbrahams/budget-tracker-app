import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURI = 'http://localhost:5001'

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: baseURI,
        prepareHeaders: async (headers, { getState }) => { 
            const token = await getState().auth.user.token
            if(token === null) return 'No token available'
            else { 
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['budget', 'transactions'],
    endpoints: () => ({}),
})

export default baseApi