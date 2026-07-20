



// External
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');


// Middleware
app.use(express.json({limit: "4mb"}));
app.use(cors());

app.use('/', (req, res) => {
    res.send("API OKOk");
});



const port = process.env.PORT;
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(port, () => {
        console.log(`Server Running at http://localhost:${port}`);
    })
}).catch((err) => {
    console.log(``)
})