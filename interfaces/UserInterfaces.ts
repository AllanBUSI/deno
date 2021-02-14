import  BillInterface  from "./BillInterface.ts";
import  ChildInterface  from './ChildInterface.ts';
import { roleTypes, sexeTypes, BillType, ChildTypes, UserTypes } from "../type/index.ts";

export default interface UserInterfaces {
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


export interface IToken {
    sub: string | undefined;
    email: string;
    firstname: string,
    lastname: string,
    role: roleTypes;
    exp: number | undefined;
}