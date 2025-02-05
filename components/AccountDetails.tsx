import { useQuery, gql } from '@apollo/client';

const FETCH_ACCOUNT_SETTINGS = gql`
  query fetchAccountSettings($username: String!) {
    fetchAccountSettings(username: $username) {
      notifications
      twoFactorAuth
    }
  }
`;

export const AccountDetails = ({ username, role }: { username: string; role: string }) => {
    if (role !== "ADMIN") {
        return <p>Access Denied</p>; // ✅ Frontend correctly restricts access
    }

    const { data, loading, error } = useQuery(FETCH_ACCOUNT_SETTINGS, { variables: { username } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading account settings.</p>;

    return (
        <div>
            <h2>Account Settings</h2>
            <p>Notifications: {data.fetchAccountSettings.notifications ? "Enabled" : "Disabled"}</p>
            <p>Two-Factor Authentication: {data.fetchAccountSettings.twoFactorAuth ? "Enabled" : "Disabled"}</p>
        </div>
    );
};

export default Account;
