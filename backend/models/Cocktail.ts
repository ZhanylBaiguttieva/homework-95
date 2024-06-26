import mongoose, {Schema, Types} from "mongoose";

import User from "./User";

const CocktailSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User does not exist!',
        },
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    recipe: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    },
    ingredients: {
        type: [{
            name: String,
            quantity: String,
        }],
        required: true,
    },
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
export default Cocktail;