import { Document } from "https://deno.land/x/mongo@v0.20.1/src/types.ts";
import { hash } from "../helper/index.ts";
import ChildInterface from "../interfaces/ChildInterface.ts";
import { UserTypes,sexeTypes,roleTypes } from "../type/index.ts";
import { ChildDB } from "../db/ChildDB.ts";
import { Bson } from "https://deno.land/x/bson/mod.ts";

export class ChildModels extends ChildDB implements ChildInterface {
  private _role: roleTypes = "Enfant";
  private id: { $oid: string } | null = null;

  firstname: string;
  lastname: string;
  email: string;
  sexe: sexeTypes;
  role: roleTypes;
  password: string;
  dateNaissance: Date;
  createdAt: Date;
  updateAt: Date;

  constructor(
    prenom: string,
    nom: string,
    email: string,
    sexe: sexeTypes,
    password: string,
    dateNaissance: Date,
  ) {
    super();
    this.firstname = prenom;
    this.lastname = nom;
    this.email = email;
    this.sexe = sexe;
    this.role = "Enfant";
    this.password = password;
    this.dateNaissance = new Date(dateNaissance);
    this.createdAt = new Date();
    this.updateAt = new Date();
  }

  get _id(): string | null {
    return (this.id === null) ? null : this.id.$oid;
  }

  get getRole(): roleTypes {
    return this._role;
  }
  setRole(role: roleTypes): void {
    this._role = role;
    this.update({ role: role });
  }
  getAge(): number {
    var ageDifMs = Date.now() - this.dateNaissance.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  fullName(): string {
    return "${this.lastname} ${this.firstname}";
  }

  // deno-lint-ignore no-explicit-any
  async generate(): Promise<any> {
    this.password = await hash(this.password);
    return {
      _id: new Bson.ObjectId(),
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      sexe: this.sexe,
      role: this.role,
      password: this.password,
      dateNaissance: this.dateNaissance,
      createdAt: this.createdAt,
      updateAt: this.updateAt,
    };
  }

  async update(update: UserTypes): Promise<void> {
    // updateOne
    const { modifiedCount } = await this.childdb.updateOne(
      { email: this.email },
      { $set: update },
    );
  }

  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async insert(): Promise<void> {
    this.password = await hash(this.password);
    this.id = await this.childdb.insertOne({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      sexe: this.sexe,
      role: this.role,
      password: this.password,
      dateNaissance: this.dateNaissance,
      createdAt: this.createdAt,
      updateAt: this.updateAt,
    }) as {
      $oid: string;
    };
  }
}
