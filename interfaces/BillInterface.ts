
export default interface BillInterface {
    _id: { $oid: string } | null | string;
    date_payment: Date;
    id_Stripe: string;
    montant_ht: string;
    montant_ttc: string;
    source: "Stripe";
    createdAt: Date;
    updateAt: Date;
  
    insert(): Promise<void>;
    delete(): Promise<void>;
}