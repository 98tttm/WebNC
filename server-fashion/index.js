const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const url = "mongodb://127.0.0.1:27017";
const dbName = "FashionData";
let fashionCollection;

async function connectDB() {
    const client = new MongoClient(url);
    await client.connect();
    console.log("Connected to MongoDB - FashionData");
    const db = client.db(dbName);
    fashionCollection = db.collection("Fashion");
}

connectDB().catch(console.error);

// GET all fashions, sorted by creationDate descending
app.get("/fashions", async (req, res) => {
    try {
        const result = await fashionCollection
            .find({})
            .sort({ creationDate: -1 })
            .toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET fashions filtered by style
app.get("/fashions/style/:style", async (req, res) => {
    try {
        const style = req.params.style;
        const result = await fashionCollection
            .find({ style: style })
            .sort({ creationDate: -1 })
            .toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a single fashion by ObjectId
app.get("/fashions/:id", async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const result = await fashionCollection.findOne({ _id: id });
        if (!result) {
            return res.status(404).json({ message: "Fashion not found" });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST add a new fashion
app.post("/fashions", async (req, res) => {
    try {
        const newFashion = {
            title: req.body.title,
            details: req.body.details,
            thumbnail: req.body.thumbnail,
            style: req.body.style,
            creationDate: new Date(),
        };
        const result = await fashionCollection.insertOne(newFashion);
        newFashion._id = result.insertedId;
        res.status(201).json(newFashion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT edit a fashion by id
app.put("/fashions/:id", async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const updateData = {
            title: req.body.title,
            details: req.body.details,
            thumbnail: req.body.thumbnail,
            style: req.body.style,
        };
        const result = await fashionCollection.updateOne(
            { _id: id },
            { $set: updateData }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Fashion not found" });
        }
        const updated = await fashionCollection.findOne({ _id: id });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a fashion by id
app.delete("/fashions/:id", async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const result = await fashionCollection.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Fashion not found" });
        }
        res.json({ message: "Fashion deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`server-fashion is running at http://localhost:${port}`);
});
