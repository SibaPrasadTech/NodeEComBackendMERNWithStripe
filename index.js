const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => { console.log("DB Connection successfull!") })
  .catch((error) => {
    console.log(error)
  })

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/carts', cartRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Express sever is running in backend at port ${5000}`);
})