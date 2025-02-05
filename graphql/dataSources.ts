export class UserAPI {
    async getUserDetails(username: string) {
        return {
            username: username,
            balance: "$" + (Math.random() * 5000).toFixed(2),
            taxID: "TAX-" + Math.floor(Math.random() * 1000000) // ❌ Vulnerability: Should not be exposed
        };
    }

    async getTransactionHistory(username: string) {
        return [
            { date: "2024-02-20", description: "Grocery Store", amount: "-$120.50", status: "Completed" },
            { date: "2024-02-18", description: "Salary Deposit", amount: "$3,000.00", status: "Completed" }
        ]; // ❌ No authentication check (any user can request any transaction history)
    }

    async getAccountSettings(username: string) {
        return { notifications: true, twoFactorAuth: false }; // ✅ Secure
    }

    async getLoanDetails(username: string) {
        return "Loan Balance: $25,000"; // ✅ Secure
    }

    async updateUserProfile(username: string, newProfileData: string) {
        return `Profile updated for ${username}: ${newProfileData}`; // ❌ No validation, any ADMIN can edit any user
    }
}
