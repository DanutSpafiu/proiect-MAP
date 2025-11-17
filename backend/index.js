import express from 'express'
import { PrismaClient } from '@prisma/client';


import elevRoutes from "./routes/elev.js";
import materieRoutes from "./routes/materie.js";
import noteRoutes from "./routes/note.js";

const app = express();
const db = new PrismaClient();

app.use(express.json());

app.use('/elevi', elevRoutes);
app.use('/materii', materieRoutes);
app.use('/note', noteRoutes);

app.listen(3000, () => {
  console.log("Server is listening on port http://localhost:3000");
})

//npx prisma studio