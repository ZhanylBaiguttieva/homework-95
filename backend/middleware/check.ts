import User from "../models/User";
import {RequestWithUser} from "./auth";
import {NextFunction, Response} from "express";

const check = async (
    req: RequestWithUser,
    _res: Response,
    next: NextFunction,
) => {
    const headerValue = req.get('Authorization');

    if (!headerValue) {
        return next();
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
        return next();
    }

    const user = await User.findOne({ token });

    if (!user) {
        return next();
    }
    req.user = user;
    next();
};

export default check;