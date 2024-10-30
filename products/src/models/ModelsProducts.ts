import { Schema, model, Document, Types } from "mongoose";

interface Product extends Document {
  _id: Types.ObjectId;
  name: string;
  price: Number;
  description: string;
  disponibilite: Boolean;
  categorie: String;
}

const ProductSchema: Schema = new Schema({
  _id: { type: Types.ObjectId, required: true },
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  disponibilite: { type: Boolean, required: true },
  categorie: { type: String, required: true },
});

const ProductsModel = model<Product>("Product", ProductSchema);

export default ProductsModel;
