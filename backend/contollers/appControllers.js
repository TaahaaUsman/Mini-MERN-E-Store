import productModel from "../models/productModel.js";

const getItems = async (req, res) => {
  try {
    let items = await productModel.find();
    if (items.length === 0) {
      return res.json({ message: "No Items Found" });
    }
    res.json({ message: items });
  } catch (err) {
    console.log("Error in getItems Controller", err);
    res.status(500).json({ message: "Internal server Error" }); // Send proper error status
  }
};

const getOneItems = async (req, res) => {
  try {
    let itemId = req.params.id;
    if (!itemId) {
      return res.json({ message: "Enter item Id" });
    }

    let item = await productModel.findOne({ _id: itemId });
    if (!item) {
      return res.json({ message: "No Users Found" });
    }

    res.json({ message: item });
  } catch (err) {
    console.log("Error in getItem Controller", err);
    res.json({ message: "Internal server Error" });
  }
};

const setItem = async (req, res) => {
  try {
    let { name, price, image } = req.body;

    if (!name || !price || !image) {
      return res.json({ message: "Please fill all fields" });
    }
    if (!/[A-Z]/.test(name)) {
      return res.json({ message: "Name invalid" });
    }
    if (isNaN(price) || price <= 0) {
      return res.json({ message: "price invalid" });
    }
    if (typeof image !== "string") {
      return res.json({ message: "image invalid" });
    }

    let createItem = await productModel.create({
      name,
      price,
      image,
    });

    if (!createItem) {
      return res.json({ message: "Some error in creation" });
    }

    res.json({ message: "Item Created" });
  } catch (err) {
    console.log("Error in setItem Controller", err);
    res.json({ message: "Internal server Error" });
  }
};

const updateItem = async (req, res) => {
  try {
    let { name, price, image } = req.body;
    let item = req.params.id;
    let itemExist = await productModel.findOne({ _id: item });

    if (!itemExist) {
      return res.json({ message: "Item Does not exist" });
    }
    if (!name || !price || !image) {
      return res.json({ message: "Please fill all fields" });
    }
    if (!/[A-Z]/.test(name)) {
      return res.json({ message: "Name invalid" });
    }
    if (isNaN(price) || price <= 0) {
      return res.json({ message: "price invalid" });
    }
    if (typeof image !== "string") {
      return res.json({ message: "image invalid" });
    }

    let updateItem = await productModel.findOneAndUpdate(
      { _id: itemExist._id },
      { name, price, image },
      { new: true }
    );

    if (updateItem) {
      return res.json({ message: "Updation successfull" });
    }
    res.json({ message: "Something went wrong" });
  } catch (err) {
    console.log("Error in updateItem Controller", err);
    res.json({ message: "Internal server Error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    let item = req.params.id;

    let itemExist = await productModel.findOne({ _id: req.params.id });

    if (!itemExist) {
      return res.json({ message: "Item does not exist" });
    }

    let deleteItem = await productModel.findOneAndDelete({ _id: item });

    if (!deleteItem) {
      return res.json({ message: "Some Error" });
    }

    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    console.log("Error in deleteItem Controller", err);
    res.json({ message: "Internal server Error" });
  }
};

export { getItems, setItem, updateItem, deleteItem, getOneItems };
