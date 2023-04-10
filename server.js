const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

// database connection

// connectToServer((err) => {
//     if (!err) {
//         app.get('/', (req, res) => {
//             res.send('Welcome to Inventory server');
//         });
//         app.listen(port, () => {
//             console.log(`Updating the server design: ${port}`);
//         })
//     }
//     else {
//         console.log(err);
//     }
// });

// DBConnect();
mongoose.connect(process.env.DATABASE).then(() => {
    console.log(`Database connection is successfull`.red.bold);
})

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});