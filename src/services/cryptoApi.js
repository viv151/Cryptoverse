// const axios = require('axios');

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
    // 'X-RapidAPI-Key': 
   
    'X-RapidAPI-Host':  process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
}
console.log(process.env);

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url)=> ({url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({  baseUrl: process.env.REACT_APP_CRYPTO_API_URL }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history/${timePeriod}`)
        }),
        getExchanges: builder.query({
            query: () => createRequest(`/exchanges`)
        }),

    })
});

export const{
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetExchangesQuery,
} = cryptoApi;

// const options = {
//   method: 'GET',
//   url: 'https://coinranking1.p.rapidapi.com/coins',
//   params: {
//     referenceCurrencyUuid: 'yhjMzLPhuIDl',
//     timePeriod: '24h',
//     'tiers[0]': '1',
//     orderBy: 'marketCap',
//     orderDirection: 'desc',
//     limit: '50',
//     offset: '0'
//   },
//   headers: {
//     
//   }
// };