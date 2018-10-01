const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = ({ username, email }, secret, expiresIn) => jwt.sign({ username, email }, secret, { expiresIn });

exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, { Recipe }) => {
            const allRecipes = await Recipe.find();
            return allRecipes;
        }
    },
    Mutation: {
        addRecipe: async (root, { name, category, description, instructions, username }, { Recipe }) => {
            // 1st arg: root/parent (required for all mutations)
            // 2nd arg: arguments (can be destructured)
            // 3d arg: context (contains our models) => can also be destructured
            const newRecipe = await new Recipe({
                name,
                category,
                description,
                instructions,
                username
            }).save();
            return newRecipe;
        },
        signupUser: async (root, { username, email, password }, { User }) => {
            const user = await User.findOne({ username });
            if (user) throw new Error('User already exists');
            const newUser = await new User({
                username,
                email,
                password
            }).save();
            return { token: createToken(newUser, process.env.SECRET, '1hr') };
        },
        signinUser: async (root, { username, password }, { User }) => {
            const user = await User.findOne({ username });
            if (!user) throw new Error('User not found');
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) throw new Error('Invalid password');
            return { token: createToken(user, process.env.SECRET, '1hr') };
        }
    }
};