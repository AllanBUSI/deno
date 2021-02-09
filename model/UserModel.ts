import UserDB from "../db/UserDB.ts";
import { hash } from "../helper/index.ts";
import UserInterfaces from "../interfaces/UserInterfaces.ts";
import { UserTypes,sexeTypes,roleTypes } from "../type/index.ts";

export class UserModels extends UserDB implements UserInterfaces {
  private _role: roleTypes = "Admin";
  private id: { $oid: string } | null = null;

  firstname: string;
  lastname: string;
  email: string;
  sexe: sexeTypes;
  password: string;
  dateNaissance: Date;
  role: roleTypes;
  createdAt: Date;
  updateAt: Date;
  subscription: number;
  cardId?: number | null;
  cvc?: number | null;
  subscribeCreatedAt?: Date | null;
  subscribeUpdateAt?: Date | null;
  token?: string;

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
    this.password = password;
    this.dateNaissance = new Date(dateNaissance);
    this.role = "Tuteur";
    this.createdAt = new Date();
    this.updateAt = new Date();
    this.subscription = 0;
    this.token = "";
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

  async insert(): Promise<void> {
    this.password = await hash(this.password);
    this.id = await this.userdb.insertOne({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      sexe: this.sexe,
      role: this.role,
      password: this.password,
      dateNaissance: this.dateNaissance,
      createdAt: this.createdAt,
      updateAt: this.updateAt,
      subscription: this.subscription,
      token: this.token,
    }) as {
      $oid: string;
    };
  }

  async update(update: UserTypes): Promise<void> {
    // updateOne
    const { modifiedCount } = await this.userdb.updateOne(
      { email: this.email },
      { $set: update },
    );
  }

  async delete(email: string): Promise<number> {
    if (email !== undefined) {
      return await this.userdb.deleteOne(this.findByEmail(email));
    } else {
      return 0;
    }
  }
}
