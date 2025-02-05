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

const UserDetails = ({ username }: { username: string }) => {
    const { data, loading, error } = useQuery(FETCH_USER_DETAILS, {
        variables: { username },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user details.</p>;

    return (
        <div>
            <h2>User Details</h2>
            <p>Username: {data.fetchUserDetails.username}</p>
            <p>Balance: {data.fetchUserDetails.balance}</p>
            <p>Tax ID: {data.fetchUserDetails.taxID} {/* ❌ Sensitive information exposed */}</p>
        </div>
    );
};

export default UserDetails;
