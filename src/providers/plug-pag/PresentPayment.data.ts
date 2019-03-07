export interface PresentPaymentData{
    deviceIdentification:string;
    PaymentType:PaymentType;
    InstallmentType:InstallmentType;
    SaleRef:string;
    installments:number;
    amount:number;
}

export enum PaymentType{
    CREDITO=1,
    DEBITO=2,
    VOUCHER=3
};

export enum InstallmentType{
    A_VISTA=1,
    PARC_VENDEDOR=2
}

export enum General{
  RET_OK=0
}