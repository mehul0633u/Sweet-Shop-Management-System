const Sweets = require('./db/sweet');

const add_sweet = async (req, res) => {
    try {
        const newSweet = new Sweets(req.body);
        await newSweet.save();

        res.status(201).json({ message: "Sweet added successfully", sweet: newSweet });
    } catch (error) {
        res.status(400).json({ error: error.message });  // 🔍 send validation errors back
    }

}

const delete_sweet = async (req, res) => {
    try {
        const result = await Sweets.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        res.status(400).json({ error: error.message });  // 🔍 send validation errors back
    }

}

module.exports = {
    add_sweet, delete_sweet
}
