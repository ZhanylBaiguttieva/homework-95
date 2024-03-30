import {Router} from "express";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Cocktail from "../models/Cocktail";
import check from "../middleware/check";
import {FilterQuery, Types} from "mongoose";
import {CocktailFields} from "../types";

const cocktailsRouter = Router();

cocktailsRouter.get('/',check, async (req: RequestWithUser, res,next) => {
    try {
        const user = req.user;
        const userId = req.query.userId;

        let filter: FilterQuery<CocktailFields> = {isPublished: true};

        if(user && user.role === 'admin') {
            filter = {};
        } else if(user && user.role === 'user') {
            if ( userId ) {
                filter = {userId: req.query.userId, isPublished:false}
            } else {
                filter = {isPublished: true}
            }

        }

        const cocktails = await Cocktail.find(filter).populate('ingredients', 'name quantity');

        const cocktailsFilled = cocktails.map((cocktailOne) => ({
                _id: cocktailOne._id,
                userId: req.user?._id,
                name: cocktailOne.name,
                recipe: cocktailOne.recipe,
                ingredients: cocktailOne.ingredients.map(ingredient =>
                    ({
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                    }),
                ),
                isPublished: cocktailOne.isPublished,
                image: cocktailOne.image,
            })
        )

        return res.send(cocktailsFilled);
    } catch (e) {
        return next(e);
    }
});
cocktailsRouter.get('/:id', async (req, res, next) => {
    try {
        let _id: Types.ObjectId;
        try {
            _id = new Types.ObjectId(req.params.id);
        } catch {
            return res.status(404).send({ error: 'Wrong ObjectId!' });
        }
        const cocktail = await Cocktail.findById(_id);

        res.send(cocktail);
    } catch (e) {
        next(e);
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
            isPublished: req.body.isPublished,
            image: req.file ? req.file.filename : null,
        };
        const cocktail = new Cocktail(cocktailData);
        await cocktail.save();
        return res.send(cocktail);
    } catch (e) {
        next(e);
    }
});


cocktailsRouter.delete(
    '/:id',
    auth,
    permit('admin'),
    async (req: RequestWithUser, res, next) => {
        try {
            let _id: Types.ObjectId;
            try {
                _id = new Types.ObjectId(req.params.id);
            } catch {
                return res.status(404).send({ error: 'Wrong ObjectId!' });
            }
            const cocktail = await Cocktail.findById(_id);
            if (!cocktail) {
                return res.status(404).send({ error: 'Cocktail Not found!' });
            }
            const deletedOne = await Cocktail.findByIdAndDelete(_id);

            res.send(deletedOne);
        } catch (e) {
            next(e);
        }
    },
);



cocktailsRouter.patch(
    '/:id/togglePublished',
    auth,
    permit('admin'),
    async (req: RequestWithUser, res, next) => {
        try {
            let _id: Types.ObjectId;
            try {
                _id = new Types.ObjectId(req.params.id);
            } catch {
                return res.status(404).send({ error: 'Wrong ObjectId!' });
            }
            const cocktail = await Cocktail.findById(_id);
            if (!cocktail) {
                return res.status(404).send({ error: 'Cocktail Not found!' });
            }

            const newCocktail = new Cocktail({
                _id: _id,
                userId: req.user?._id,
                name: req.body.name,
                recipe: req.body.recipe,
                ingredients: req.body.ingredients,
                image: cocktail.image,
                isPublished: !req.body.isPublished,
            });

            res.send(await Cocktail.findByIdAndUpdate(_id, newCocktail));
        } catch (e) {
            next(e);
        }
    },
);

export default cocktailsRouter;