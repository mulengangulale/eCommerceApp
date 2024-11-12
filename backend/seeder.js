import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

/**
 * Imports data into the database by deleting existing data and inserting new data.
 * 
 * This function performs the following steps:
 * 1. Deletes all existing orders, products, and users from the database.
 * 2. Inserts a predefined list of users into the database.
 * 3. Sets the first user in the list as the admin user.
 * 4. Associates each product with the admin user and inserts the products into the database.
 * 5. Logs a success message and exits the process.
 * 
 * If an error occurs during any of these steps, it logs the error message and exits the process with a failure code.
 * 
 * @async
 * @function importData
 * @returns {Promise<void>} A promise that resolves when the data import is complete.
 */

/**
 * Deletes all existing data from the database.
 * 
 * This function performs the following steps:
 * 1. Deletes all existing orders, products, and users from the database.
 * 2. Logs a success message and exits the process.
 * 
 * If an error occurs during any of these steps, it logs the error message and exits the process with a failure code.
 * 
 * @async
 * @function destroyData
 * @returns {Promise<void>} A promise that resolves when the data destruction is complete.
 */
const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log("Data Imported!".green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!".red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}