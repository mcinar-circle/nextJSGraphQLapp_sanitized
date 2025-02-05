import { IResolvers } from '@graphql-tools/utils';

const userRoles = {
    alice: "ADMIN",
    bob: "USER",
    carlos: "GUEST"
};

const resolvers: IResolvers = {
    Query: {
        fetchUserDetails: (_, { username }, { dataSources }) => {
            return dataSources.userAPI.getUserDetails(username); // ❌ No authentication check
        },

        fetchTransactionHistory: (_, { username }, { dataSources }) => {
            return dataSources.userAPI.getTransactionHistory(username); // ❌ No authentication check
        },

        fetchLoanDetails: (_, { username }, { dataSources, user }) => {
            if (!user || user.role !== "ADMIN") {
                throw new Error("Access Denied"); // ✅ Secure Implementation
            }
            return dataSources.userAPI.getLoanDetails(username);
        },

        fetchAccountSettings: (_, { username }, { dataSources, user }) => {
            if (!user || user.role !== "ADMIN") {
                throw new Error("Access Denied"); // ✅ Secure Implementation
            }
            return dataSources.userAPI.getAccountSettings(username);
        },
    },

    Mutation: {
        updateUserProfile: (_, { username, newProfileData }, { dataSources }) => {
            return dataSources.userAPI.updateUserProfile(username, newProfileData); // ❌ No validation, any ADMIN can edit any user
        }
    }
};

export default resolvers;
