import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import uuidv4 from 'uuid/v4';

import models, { connectDB, connectDb } from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

app.use((req, res, next) => {
    req.context = {
        models,
        me: await models.User.findByLogin('admin'),
    };
    next();
});

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
    if (eraseDatabaseOnSync) {
        await Promise.all([
            models.User.deleteMany({}),
            models.Message.deleteMany({}),
        ]);
    
    const createUsersWithMessages =async () => {
        const user1 = new models.User({
            username: 'admin',
        });
        const message1 = new models.Message({
            text: 'This is just at test',
            user: user1.id,
        });

        await message1.save();

        await user1.save();
    };
    
}
    app.listen(process.env.PORT, () => 
        console.log(`App listening on port ${process.env.PORT}!`),
    );
});




