const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { id }) => {
            const foundUser = await User.findOne({
                $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
            });

            if (!foundUser) {
                throw new Error('Cannot find a user with this id!');
            }

            return foundUser
        },
    },

    Mutation: {

        createUser: async (parent, { body }) => {
            const user = await User.create(body);

            if (!user) {
                throw new Error('Something is wrong!');
            }
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { body }) => {
            const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
            if (!user) {
                throw new Error("Can't find this user");
            }

            const correctPw = await user.isCorrectPassword(body.password);

            if (!correctPw) {
                throw new Error('Wrong password!');
            }
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { user, body }) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: body } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (err) {
                console.error(err);
                throw new Error(err.message);
            }
        },

        deleteBook: async (parent, { user, params }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                throw new Error("Couldn't find user with this id!");
            }
            return updatedUser;
        },

    },
};

module.exports = resolvers;
