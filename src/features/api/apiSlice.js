import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000',
    }),
    endpoints:(builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
        }),
        getRelatedVideos: builder.query({
            query: ({id, title}) =>{
                const tags = title.split(" ");
                let likes = tags.map(tag => `title_like=${tag}`).join("&") +`&id_ne=${id}&_limit=4`
                const queryString = `/videos?${likes}`;
                return queryString;
            },
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body:data,
            })
        })
    })
})

export const {useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery, useAddVideoMutation} = apiSlice;