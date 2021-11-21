export type StatusCallback = (message: string) => void

export interface SafeStatus {
    fixEnabled: boolean
}

export declare enum OperationType {
    Call = 0,
    DelegateCall = 1
}

export interface MetaTransactionData {
    readonly to: string;
    readonly value: string;
    readonly data: string;
    readonly operation?: OperationType;
}