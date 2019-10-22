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
        me: models.users[1],
    };
    next();
});

connectDb().then(async () => {
    app.listen(process.env.PORT, () => 
        console.log(`App listening on port ${process.env.PORT}!`),
    );
});




