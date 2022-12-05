import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const port = process.env.PORT||5001
const baseURI = `http://localhost:${port}`

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: baseURI,
        prepareHeaders: async (headers, { getState }) => { 
            const token = await getState().auth?.user?.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            } else { 
                return "No Token"
            }
            return headers
        },
    }),
    tagTypes: ['budget', 'transactions'],
    endpoints: () => ({}),
})

export default baseApi