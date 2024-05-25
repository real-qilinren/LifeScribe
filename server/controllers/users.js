import User from '../models/User.js';

/* READ */
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const friends = await Promise.all(
            user.friends.map((friendId) => {
                return User.findById(friendId);
            })
        );

        const formattedFriends = friends.map(
            ({_id, firstname, lastname, occupation, location, picturePath}) => {
                return {_id, firstname, lastname, occupation, location, picturePath};
            }
        );

        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((friendId) => {
                return User.findById(friendId);
            })
        );

        const formattedFriends = friends.map(
            ({_id, firstname, lastname, occupation, location, picturePath}) => {
                return {_id, firstname, lastname, occupation, location, picturePath};
            }
        );

        res.status(200).json(formattedFriends);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}