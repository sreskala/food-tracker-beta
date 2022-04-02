const express = require('express');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route   GET api/profiles/me 
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

//@route   POST api/profiles
router.post('/', [ auth, [
    check('status', 'Status is required.').not().isEmpty(),
    check('settings', 'Settings are required.').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        location,
        status,
        settings,
        foodPreferences
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (settings) {
        profileFields.settings = settings.split(",").map(setting => setting.trim());
    }

    //build foodPreferences
    profileFields.foodPreferences = [];
    foodPreferences.forEach(fp => {
        profileFields.foodPreferences.push(fp);
    })

    try {
        let profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            //update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });

            return res.json(profile);
        }

        //Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}); 

//@route   DELETE api/profiles
//deletes profile and user
router.delete('/', auth, async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id })

        res.json({ msg: 'User deleted' });
    } catch (err) {
        
    }
});

module.exports = router;