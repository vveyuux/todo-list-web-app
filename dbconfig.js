import mongoose from "mongoose";

export const localConnect = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");
};

export const cloudConnect = async () => {
  await mongoose.connect(
    "mongodb+srv://admin-vveyuux:1234@cluster0.mj59dfr.mongodb.net/todolistDB"
  );
};

export const closeConnection = async () => {
  await mongoose.connection.close();
};

const itemsSchema = {
  name: String,
};

const listsSchema = {
  name: String,
  items: [itemsSchema],
};

export const List = mongoose.model("list", listsSchema);

export const Item = mongoose.model("item", itemsSchema);
