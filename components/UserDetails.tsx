import { useQuery, gql } from '@apollo/client';

const FETCH_USER_DETAILS = gql`
  query fetchUserDetails($username: String!) {
    fetchUserDetails(username: $username) {
      username
      balance
      taxID  // ❌ Vulnerability: Tax ID is exposed here
    }
  }
`;

export const UserDetails = ({ username }: { username: string }) => {
    const { data, loading, error } = useQuery(FETCH_USER_DETAILS, {
        variables: { username },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user details.</p>;

    return (
        <div>

            <p>Username: {data.fetchUserDetails.username}</p>
            <p>Balance: {data.fetchUserDetails.balance}</p>
            <p>Tax ID: {data.fetchUserDetails.taxID} {/* ❌ Sensitive information exposed */}</p>
            {role === "ADMIN" && username === loggedInUser && (
                <button onClick={handleEditProfile}>Edit Profile</button> // ✅ Frontend enforces restriction
            )}
        </div>
    );
};

export default UserDetails;
