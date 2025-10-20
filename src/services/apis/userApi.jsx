import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from "js-cookie";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://buyonidatech-production.up.railway.app/api/',
        prepareHeaders: (headers) => {
            const token = Cookies.get('adminToken') || sessionStorage.getItem('adminToken');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Contacts', 'Logos', 'OurTeams', "Projects"],
    endpoints: (builder) => ({
        // Admins  
        loginAdmin: builder.mutation({
            query: (newData) => ({
                url: `Admins/login`,
                method: 'POST',
                body: newData,
                headers: { 'Content-Type': 'application/json' }
            }),

        }),
        // Contacts
        getAllContacts: builder.query({
            query: () => ({
                url: `Contacts/get-all-contacts`
            }),
            providesTags: ['Contacts']

        }),
        getOneContact: builder.query({
            query: contactId => ({
                url: `Contacts/contact/${contactId}`
            }),
            providesTags: ['Contacts']
        }),


        createContacts: builder.mutation({
            query: newData => ({
                url: `Contacts/create-contact`,
                method: "POST",
                body: newData

            }),
            invalidatesTags: ['Contacts']
        }),

        // Logos
        getAllLogos: builder.query({
            query: () => ({
                url: `Logos`
            }),
            providesTags: ['Logos']

        }),
        getOneLogos: builder.query({
            query: logosId => ({
                url: `Logos/${logosId}`
            }),
            providesTags: ['Logos']
        }),


        createLogos: builder.mutation({
            query: newData => ({
                url: `Logos`,
                method: "POST",
                body: newData

            }),
            invalidatesTags: ['Logos']
        }),
        deleteLogos: builder.mutation({
            query: logoId => ({
                url: `Logos/${logoId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Logos']
        }),


        // Our Teams

        getAllOurTeams: builder.query({
            query: () => ({
                url: `OurTeams`
            }),
            providesTags: ['OurTeams']

        }),
        getOneOurTeams: builder.query({
            query: teamId => ({
                url: `OurTeams/${teamId}`
            }),
            providesTags: ['OurTeams']
        }),

        deleteOurTeams: builder.mutation({
            query: teamId => ({
                url: `OurTeams/${teamId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['OurTeams']
        }),
        createOurTeams: builder.mutation({
            query: newData => ({
                url: `OurTeams`,
                method: "POST",
                body: newData

            }),
            invalidatesTags: ['OurTeams']
        }),
        updateOurTeams: builder.mutation({
            query: newData => ({
                url: `OurTeams`,
                method: "PUT",
                body: newData

            }),
            invalidatesTags: ['OurTeams']
        }),

        // Projects

        getAllProjects: builder.query({
            query: () => ({
                url: `Projects`
            }),
            providesTags: ['Projects']

        }),
        getOneProjects: builder.query({
            query: projectId => ({
                url: `Projects/${projectId}`
            }),
            providesTags: ['Projects']
        }),

        deleteProjects: builder.mutation({
            query: projectId => ({
                url: `Projects/${projectId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Projects']
        }),
        createProjects: builder.mutation({
            query: newData => ({
                url: `Projects`,
                method: "POST",
                body: newData

            }),
            invalidatesTags: ['Projects']
        }),
        updateProjects: builder.mutation({
            query: newData => ({
                url: `Projects`,
                method: "PUT",
                body: newData

            }),
            invalidatesTags: ['Projects']
        }),
    }),
})

export const {
    //Login
    useLoginAdminMutation,
    //Contact
    useGetAllContactsQuery,
    useGetOneContactQuery,
    useCreateContactsMutation,

    //Logos
    useGetAllLogosQuery,
    useGetOneLogosQuery,
    useCreateLogosMutation,
    useDeleteLogosMutation,

    //Team
    useGetAllOurTeamsQuery,
    useGetOneOurTeamsQuery,
    useCreateOurTeamsMutation,
    useDeleteOurTeamsMutation,
    useUpdateOurTeamsMutation,

    // Projects
    useGetAllProjectsQuery,
    useGetOneProjectsQuery,
    useUpdateProjectsMutation,
    useDeleteProjectsMutation,
    useCreateProjectsMutation,
} = userApi