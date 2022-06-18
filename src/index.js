const PORT = 3000;
const COLLECTION_NAME = "blogs";
const DATE_FORMAT = { weekday: "long", year: "numeric", month: "long", day: "numeric" };


const express = require("express");
const cors = require("cors");
const { db } =  require("./firebase.js");


const app = express();
app.use(cors());
app.use(express.json());

app.get("/blogs", (req, res) => {
    db.collection(COLLECTION_NAME).get()
        .then((snapshot) => {
            let all_data = {
                success: true,
                body: []
            };
            snapshot.forEach((doc) => {
                reformat_data(doc, all_data);
            });
            res.json(all_data);
        })
        .catch(console.log);

});

app.post("/blogs/new", (req, res) => {
    const body = req.body;
    const current_date = new Date().getTime();

    body["date"] = current_date ;

    db.collection(COLLECTION_NAME).doc().set(body)
        .then(()=>{
            res.json({
                success: true,
                body: "Date posted successfully"
            })
        })
        .catch(console.log);

    
})

app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});

/**
 * It takes a document from the database, converts the date to a different format, and then adds it to an array.
 * @param doc - the document object
 * @param all_data - This is the object that will be returned to the client.
 */
function reformat_data(doc, all_data) {
    const converted_date = new Date(doc.data().date).toLocaleDateString("en-EN", DATE_FORMAT);

    const single_data = doc.data();
    single_data["date"] = converted_date;

    all_data.body.push({
        id: doc.id,
        data: single_data
    });
}

