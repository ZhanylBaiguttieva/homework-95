import {Router} from "express";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Cocktail from "../models/Cocktail";

const cocktailsRouter = Router();

cocktailsRouter.get('/', async (req: RequestWithUser, res,next) => {
    try {
        const cocktails = await Cocktail.find().populate('ingredients', 'name quantity');

        const cocktailsFilled = cocktails.map((cocktailOne) => ({
                id: cocktailOne.id,
                userId: req.user?._id,
                name: cocktailOne.name,
                recipe: cocktailOne.recipe,
                ingredients: cocktailOne.ingredients.map(ingredient =>
                    ({
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                    }),
                ),
                image: cocktailOne.image,
            })
        )

        return res.send(cocktailsFilled);
    } catch (e) {
        return next(e);
    }
});
cocktailsRouter.post(
    '/',
    auth,
    permit( 'admin','user'),
    imagesUpload.single('image'),
    async(req: RequestWithUser, res, next ) => {
    try {
        let  ingredientsParse;
        ingredientsParse = JSON.parse(req.body.ingredients);

        const cocktailData = {
            userId: req.user?._id,
            name: req.body.name,
            recipe: req.body.recipe,
            ingredients: ingredientsParse,
            image: req.file ? req.file.filename : null,
        };
        const cocktail = new Cocktail(cocktailData);
        await cocktail.save();
        return res.send(cocktail);
    } catch (e) {
        next(e);
    }
});

export default cocktailsRouter;