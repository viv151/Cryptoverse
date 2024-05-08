import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Header } from "antd/es/layout/layout";

const cryptoNewsHeaders = {

    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_NEWS_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
}


const createRequest = (url) => ({url, headers: cryptoNewsHeaders});

export const cryptoNewsApi =  createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_NEWS_API_URL }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/search?&keyword=${newsCategory}&lr=en-US`),
        })
    })
});

export const{
    useGetCryptoNewsQuery,
} = cryptoNewsApi;

