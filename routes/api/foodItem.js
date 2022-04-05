const express = require("express");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const StoragePlace = require('../../models/StoragePlace');
const FoodItem = require("../../models/FoodItem");

const router = express.Router();

//@route   GET api/fooditems/:id
//get food items by storage id 
router.get('/:id', auth, async (req, res) => {
    try {
        const storagePlace = await StoragePlace.findById(req.params.id).and([ { user: req.user.id }])

        if (!storagePlace) {
            return res.status(404).json({ msg: 'Invalid storage place.' });
        }

        const foodItems = await FoodItem.find({ storedIn: storagePlace.id }).sort({ name: -1 });

        if (foodItems.length < 1) {
            return res.status(400).json({ msg: 'No storage places found for this user.' });
        }

        res.json(foodItems);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route   POST api/fooditems
//create storage places
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("quantity", "Quantity is required").not().isEmpty(),
      check("individualPrice", "Price is required").not().isEmpty(),
      check("storedIn", "Storage Place is requited").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      quantity,
      isPerishable,
      expirationDate,
      individualPrice,
      storedIn,
    } = req.body;

    if (isPerishable && !expirationDate) {
      return res
        .status(400)
        .json({
          errors: [{ msg: "Perishable foods must have an expiration date" }],
        });
    }

    try {
      const newFoodItem = new FoodItem({
        name,
        quantity,
        isPerishable,
        expirationDate,
        individualPrice,
        storedIn
      });

      const foodItem = await newFoodItem.save();
      res.json(foodItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
