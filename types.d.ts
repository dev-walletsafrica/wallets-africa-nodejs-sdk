declare type currencyType = 'NGN' | 'USD' | 'GHS' | 'KES';

declare interface TransactionOptions {
    skip?: number;
    take?: number;
    // A valid date format in string
    dateFrom?: string | Date;
    // A valid date format in string
    dateTo?: string | Date;
    transactionType?: number;
    phoneNumber?: string;
    transactionPin?: string | number;
    currency?: currencyType;
}

declare interface BankTransOptions {
    BankCode: string;
    AccountNumber: string;
    AccountName: string;
    TransactionReference: string;
    Amount: number;
    Narration: string;
}

declare interface CreateOptions {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string | Date;
}

declare interface CreateCardOptions {
    amount: number;
    firstName: string;
    lastName: string;
    email: string;
    nameOnCard: string;
    dob: string | Date;
    idNo: string;
    idType: number;
    isPhysicalCard: boolean;
    Address?: string;
    stateid: number;
    localid: number;
    phoneNumber: string;
    currency: string;
}
