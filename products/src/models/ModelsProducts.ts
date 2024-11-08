import { Schema, model, Document, Types } from "mongoose";

interface Product extends Document {
  _id: Types.ObjectId;
  name: string;
  price: Number;
  description: string;
  disponibilite: Boolean;
  categorie: String;
  image: String;
  tags: string[];
}

const ProductSchema: Schema = new Schema({
  _id: { type: Types.ObjectId, required: true },
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  disponibilite: { type: Boolean, required: true },
  categorie: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], required: true }, 
});

const ProductsModel = model<Product>("Product", ProductSchema);

export default ProductsModel;
