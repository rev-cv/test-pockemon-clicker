import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://pokemons.free.beeceptor.com';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const authToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('auth_token='))
                ?.split('=')[1];
            if (authToken) {
                headers.set('Authorization', `Bearer ${authToken}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({

        register: builder.mutation({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),

        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        refreshToken: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            }),
        }),
    }),
});

export const { 
    useRegisterMutation, 
    useLoginMutation, 
    useRefreshTokenMutation 
} = authApi;