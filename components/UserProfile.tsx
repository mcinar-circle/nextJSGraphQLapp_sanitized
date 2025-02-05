import { useQuery, useMutation, gql } from '@apollo/client';

import { AccountDetails } from './AccountDetails.tsx';
import { UserDetails } from './UserDetails.tsx';

const FETCH_USER_PROFILE = gql`
  query fetchUserDetails($username: String!) {
    fetchUserDetails(username: $username) {
      username
      balance
      taxID  // ❌ Vulnerability: Sensitive data exposed
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfile($username: String!, $newProfileData: String!) {
    updateUserProfile(username: $username, newProfileData: $newProfileData)
  }
`;

const UserProfile = ({ username, loggedInUser, role }: { username: string; loggedInUser: string; role: string }) => {
    const { data, loading, error } = useQuery(FETCH_USER_PROFILE, { variables: { username } });
    const [updateProfile] = useMutation(UPDATE_USER_PROFILE);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user profile.</p>;

    const handleEditProfile = () => {
        if (role !== "ADMIN" || username !== loggedInUser) {
            alert("You do not have permission to edit this profile."); // ✅ Secure frontend check
            return;
        }
        updateProfile({ variables: { username, newProfileData: "Updated Profile Info" } });
    };

    return (
        <div>
            <h2>User Details</h2>
            <UserDetails username={''} />


            <h2>Account Details</h2>
            <Account username={''} role={''} />
        </div>
    );
};

export default UserProfile;
