import express from 'express';
import * as dotenv from 'dotenv';
import sequelize from './config/database.js';
import cors from 'cors';
import router from './routes/index.js';
import errorMiddleware from './middleware/ErrorHandlingMiddleware.js';
import { Offer } from './models/offer.js';
import { Review } from './models/review.js';
import { User } from './models/user.js';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();

app.use('/', router);
app.use(cors());
app.use(express.json());
app.use(errorMiddleware);
app.use('/static', express.static(path.resolve(__dirname, 'static')));

app.get('/', (req, res) => {
    res.status(200).json({message: `Ура!Все заработало!`})
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`)); 
    } catch (e) {
        console.log(e);
    }

};

start();

