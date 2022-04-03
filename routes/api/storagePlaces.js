const express = require('express');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const StoragePlace = require('../../models/StoragePlace');
const User = require('../../models/Profile');
const Profile = require('../../models/User');

const router = express.Router();

//@route   GET api/storageplaces 
router.get('/', auth, async (req, res) => {
    try {
        const storagePlaces = await StoragePlace.find({ user: req.user.id }).sort({ date: -1 });

        if (storagePlaces.length < 1) {
            return res.status(400).json({ msg: 'No storage places found for this user.' });
        }

        res.json(storagePlaces);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route   GET api/storageplaces/:id
router.get('/:id', auth, async (req, res) => {
    try {
        const storagePlace = await StoragePlace.findById(req.params.id).and([ { user: req.user.id }]);

        if (!storagePlace) {
            return res.status(404).json({ msg: 'Storage place not found.' });
        }

        res.json(storagePlace);

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Storage place not found.' });
        }
        res.status(500).send('Server Error');
    }
});

//@route   POST api/storageplaces
//create storage places
router.post('/', [
    auth,
    [
        check('name', 'Name is required').not().isEmpty(),
        check('storageCapacity', 'Capacity is required').not().isEmpty(),
        check('storageCapacity', 'Capacity must be a number').isNumeric(),
        check('storageLocation', 'Storage Location is requited').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, storageType, storageCapacity, storageLocation } = req.body;

    try {
        const newStoragePlace = new StoragePlace({
            user: req.user.id,
            name,
            storageType,
            storageCapacity,
            storageLocation,
        });

        const storagePlace = await newStoragePlace.save();
        res.json(storagePlace);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

//@route   DELETE api/storageplaces/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        const storagePlace = await StoragePlace.findById(req.params.id).and([ { user: req.user.id }]);

        if (!storagePlace) {
            return res.status(404).json({ msg: 'Storage place not found.' });
        }

        await storagePlace.remove();

        res.json({ msg: 'Storage place deleted.' });

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Storage place not found.' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;