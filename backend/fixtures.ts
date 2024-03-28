import mongoose from "mongoose";
import config from "./config";
import Cocktail from "./models/Cocktail";
import User from "./models/User";


const dropCollection = async (
    db: mongoose.Connection,
    collectionName: string,
) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};
const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;
    const collections = ['users','cocktails'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    const [user1, user2] = await User.create(
        {
            email: 'Zhanyl@shop.local',
            displayName: 'Zhanyl',
            password: '123',
            token: crypto.randomUUID(),
            role: 'admin',
            avatar: 'fixtures/avatar.png',
        },
        {
            email: 'TestUser@shop.local',
            displayName: 'TestUser',
            password: '000',
            token: crypto.randomUUID(),
            role: 'user',
            avatar: "fixtures/avatar.png"
        },
    );

    await Cocktail.create(
        {
            userId: user1.id,
            name: 'Long Island',
            recipe: 'Some recipe',
            image: 'fixtures/longisland.png',
            isPublished: false,
            ingredients: [{
                    name: 'White rum',
                    quantity: '15ml'
            }],
        },
        {
            userId: user1.id,
            name: 'Lagoon',
            recipe: 'Some recipe 2',
            image: 'fixtures/BlueLaguna.png',
            isPublished: false,
            ingredients: [
                {
                    name: 'Tequila',
                    quantity: '20ml',
                },
                {
                    name: 'Gin',
                    quantity: '20ml',
                },
            ],
        },

    );

    await db.close();
};

void run();