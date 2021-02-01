// deno-lint-ignore-file
import { db } from "./db.ts";
import BillInterface from "../interfaces/BillInterface.ts";
import { BillType } from "../types/billType.ts";

export default class BillDB {
  protected billdb: any;
  constructor() {
    this.billdb = db.collection<BillInterface>("bills");
  }

  async getBills(_id: string[] | string): Promise<BillInterface[]> {
    const bills = await this.billdb.find({ _id }).toArray();
    return bills || [];
  }

  insert(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(update: BillType): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
