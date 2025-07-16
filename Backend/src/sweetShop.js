const Sweets = require('./db/sweet');

const add_sweet = async (req, res) => {
    try {
        const newSweet = new Sweets(req.body);
        await newSweet.save();

        res.status(201).json({ message: "Sweet added successfully", sweet: newSweet });
    } catch (error) {
        res.status(400).json({ error: error.message });  //  send validation errors back
    }

}

const delete_sweet = async (req, res) => {
    try {
        const result = await Sweets.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        res.status(400).json({ error: error.message });  //  send validation errors back
    }

}

const view_sweet = async (req, res) => {
    try {
        let sweets = await Sweets.find();
        if (Sweets.length > 0) {
            res.send(sweets);
        }
        else {
            res.send({ result: "No Sweets Found" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message });  //  send validation errors back
    }

}

//serch sweets by name, category, or price range
const search_sweets = async (req, res) => {
    try {
        const { name, category, minPrice, maxPrice } = req.query;

        const query = {};
        if (name) query.name = name;
        if (category) query.category = category;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const results = await Sweets.find(query);
        res.json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//  Sort sweets by field and order
const sort_sweets = async (req, res) => {
    try {
        const { field = 'price', order = 'asc' } = req.query;

        const sortOrder = order === 'desc' ? -1 : 1;
        const results = await Sweets.find().sort({ [field]: sortOrder });

        res.json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const purchase_sweet = async (req, res) => {
  try {
    const { id, quantity } = req.body;

    // 1. Find the sweet by `id` (your custom ID field)
    const sweet = await Sweets.findOne({ id: id });

    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    // 2. Check quantity
    if (sweet.quantity < quantity) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    // 3. Reduce quantity and save
    sweet.quantity -= quantity;
    await sweet.save();

    res.json({ message: "Purchase successful", sweet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    add_sweet, delete_sweet, view_sweet,search_sweets, sort_sweets,purchase_sweet
}
