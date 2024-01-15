import express from "express";
import morgan from "morgan";
import pkg from "../package.json";

import { createRoles } from "./libs/inialSetup";

import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import docenteRoutes from "./routes/docente.routes";
import actividadRoutes from "./routes/actividad.routes";
import notaRoutes from "./routes/nota.routes";
import estudianteRoutes from "./routes/estudiantes.routes";
import userRoutes from "./routes/user.routes";


require('dotenv').config()
const bodyParser = require('body-parser');


const app = express()

/* Cors son para que n o se bloqueen las solicitudes */
const cors = require('cors');
// var corsOption ={
//     origin: '*',
//     optionsSuccessStatus:200
// }
var corsOption ={
    origin: ['http://localhost:4000', 'http://localhost:8080'],
    optionsSuccessStatus:200

}
app.use(cors(corsOption));
/* EndCors */
createRoles();
global.__basedir = __dirname;

app.set('pkg', pkg);
app.use(express.json());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        nombreproyecto: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/docente', docenteRoutes);
app.use('/api/actividad', actividadRoutes);
app.use('/api/nota', notaRoutes);
app.use('/api/estudiante', estudianteRoutes);
app.use('/api/user', userRoutes);


export default app;