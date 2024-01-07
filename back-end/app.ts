import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import { huurderRouter } from './controller/huurder.route';
import { kotRouter } from './controller/kot.route';
import { verhuurderRouter } from './controller/verhuurder.route';
import { reactieRouter } from './controller/reactie.route';
import swaggerUi from 'swagger-ui-express';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';

const swaggerOptions = {
    //Swagger installatie
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Kot API',
            description: 'API documentatie voor Kot App',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Ontwikkelserver',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./controller/*.route.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const app = express();
app.use(helmet()); //helmet (HTTPSecurity)
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            connectSrc: ['self', 'https://api.ucll.be'], //connecties naar deze server en api.ucll.be zijn toegelaten
        },
    })
);

dotenv.config();
const port = process.env.APP_PORT || 8080;

app.use(cors({ origin: ['http://localhost:3000'] }));
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
    }).unless({
        path: [/^\/api-docs\/.*/, { url: '/verhuurders/login', methods: ['POST'] }, '/status'],
    })
);

//Swagger documentatie
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Post request implementeren voor huurder
app.use('/huurders', huurderRouter);

//Post request implementeren voor kot
app.use('/koten', kotRouter);

//Post request implementeren voor verhuurder
app.use('/verhuurders', verhuurderRouter);

//Post request implementeren voor Reactie
app.use('/reactie', reactieRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Kot API is running.' });
});

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'application error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port || 8080, () => {
    console.log(`Kot API is running on port ${port}.`);
});
