
import { roleTypes, sexeTypes, BillType, ChildTypes, UserTypes } from "../type/index.ts";

export default interface ChildInterface {
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
  
    getAge(): number;
    fullName(): string;
    insert(): Promise<void>;
    update(update: UserTypes): Promise<void>;
    delete(): Promise<void>;
} 