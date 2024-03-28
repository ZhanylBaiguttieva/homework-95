import {Router} from "express";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Cocktail from "../models/Cocktail";

const cocktailsRouter = Router();

cocktailsRouter.get('/', async (req,res,next) => {
    try {
        const result = await Cocktail.find();
        return res.send(result);
    } catch (e) {
        return next(e);
    }
});
cocktailsRouter.post(
    '/',
    auth,
    permit( 'admin'),
    imagesUpload.single('image'),
    async(req: RequestWithUser, res, next ) => {
    try {
        const cocktailData = {
            user: req.user?._id,
            name: req.body.email,
            recipe: req.body.recipe,
            ingredients: req.body.ingredients,
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