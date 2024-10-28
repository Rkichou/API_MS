import { Schema, model, Document, Types } from "mongoose";

interface User extends Document {
  product_id: Types.ObjectId;
  name: string;
  price: Number;
  description: string;
  disponibilite: Boolean;
  categorie: String;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: string, required: true },
  disponibilite: { type: Boolean, required: true },
  categorie: { type: String, required: true },
});

const ProductsModel = model<Product>("Product", ProductSchema);

export default UserModel;
