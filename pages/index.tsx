import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Welcome to Secure GraphQL Training</h1>
            <ul>
                <li><Link href="/transactions">View Transactions</Link></li>
                <li><Link href="/profile">View Profile</Link></li>
            </ul>
        </div>
    );
}
