interface ConnectValue {
    accessToken: string;
    grantId: string;
    requestId: string;
}
interface Account {
    accountNumber: string;
    accountName: string;
    balance: number;
    currency: string;
}
interface Bank {
    name: string;
    logo: string;
    code: string;
}
interface Transaction {
    transactionDateTime: string;
    amount: number;
    description: string;
    accountNumber: string;
    reference: string;
}
interface UserInfo {
    accounts: Account[];
    fiService: Bank;
    transactions: Transaction[];
}

export type { ConnectValue, Account, UserInfo, Bank, Transaction }