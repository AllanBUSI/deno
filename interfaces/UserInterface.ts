import { roleTypes, sexeTypes, BillType, ChildTypes, UserTypes } from "../type/index.ts";

export interface UserInterfaces {
    _id: { $oid: string } | null | string;
  
    firstname: string;
    lastname: string;
    email: string;
    sexe: sexeTypes;
    role: roleTypes;
    password: string;
    dateNaissance: Date;
    createdAt: Date;
    updateAt: Date;
    subscription: number;
    childs?: ChildInterface[];
    bills?: BillInterface[];
    connection?: boolean;
    token?: string;
    cardId?: number | null;
    cvc?: number | null;
    subscribeCreatedAt?: Date | null;
    subscribeUpdateAt?: Date | null;
  
    getAge(): number;
    fullName(): string;
    insert(): Promise<void>;
    update(update: UserTypes): Promise<void>;
    delete(email: string): Promise<number>;
}

export interface ChildInterface {
    _id: { $oid: string } | null | string;
    firstname: string;
    lastname: string;
    email: string;
    sexe: sexeTypes;
    role: roleTypes;
    password: string;
    dateNaissance: Date;
    createdAt: Date;
    updateAt: Date;
    token?: string;
    subscription: number;
  
    getAge(): number;
    fullName(): string;
    insert(): Promise<void>;
    update(update: UserTypes): Promise<void>;
    delete(): Promise<void>;
}  

export interface BillInterface {
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

export interface IToken {
    sub: string | undefined;
    email: string;
    role: roleTypes;
    exp: number | undefined;
}