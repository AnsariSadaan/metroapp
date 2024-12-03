// controllers/user.controller.js
import { User } from '../models/user.model.js';

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user is set by auth middleware

        const user = await User.findById(userId).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};
