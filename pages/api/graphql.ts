import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { typeDefs } from "../../graphql/schema.gql";
import resolvers from "../../graphql/resolvers";
import { UserAPI } from "../../graphql/dataSources";
import jwt from "jsonwebtoken";

const SECRET_KEY = "SuperSecretKey"; // ❌ Hardcoded key for demonstration (should be in env variables)

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }: { req: NextApiRequest }) => {
        const token = req.headers.authorization?.split(" ")[1];
        let user = null;

        if (token) {
            try {
                user = jwt.verify(token, SECRET_KEY); // ❌ Vulnerable: Hardcoded key
            } catch (err) {
                console.warn("Invalid token"); // ❌ No rejection, just logs it
            }
        }

        return { user, dataSources: { userAPI: new UserAPI() } };
    },
});

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    return apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}
