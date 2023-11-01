import * as dotenv from 'dotenv'; //gives error this line
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'; //gives error this line
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc'; //gives error this line
//import swaggerUi from 'swagger-ui-express'; //gives error this line
import { huurderRouter } from './controller/huurder.route';
import { kotRouter } from './controller/kot.route';
import { verhuurderRouter } from './controller/verhuurder.route';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;


app.use(cors({ origin: 'https://localhost:8000' }));
app.use(bodyParser.json());

//Post request implementeren voor huurder
app.use('/huurders', huurderRouter);

//Get request implementeren voor huurder
app.get('/huurders', huurderRouter);

//Post request implementeren voor kot
app.use('/koten', kotRouter);

//Get request implementeren voor kot
app.get('/koten', kotRouter);

//Post request implementeren voor verhuurder
app.use('/verhuurders', verhuurderRouter);

//Get request implementeren voor verhuurder
app.get('/verhuurders', verhuurderRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Kot API is running.' });
});

const swaggerOpts = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "Courses API",
            version: "2.0.0",
        },
    },
    apis: ["./controller/*.routes.ts"]
}
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(port || 3000, () => {
    console.log(`Kot API is running on port ${port}.`);
});
