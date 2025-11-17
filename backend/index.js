import express from 'express'
import { PrismaClient } from '@prisma/client';

const app = express();
const db = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is runnning!');
})
//GET elevi
app.get('/elevi', async(req, res) => {
  try{
  const elevi = await db.elev.findMany();
  res.json(elevi);
  } catch(error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
//POST elevi
app.post('/elevi', async(req, res) => {
  try {
  const { name, clasa } = req.body;
  //Validate user input
  if(typeof name !== 'string') {
    return res.status(400).json({error: 'Name must be a string'});
  }
  const elevNou = await db.elev.create({
    data: {
      name: name,
      clasa: clasa
    }
  })
  res.json(elevNou);
  } catch(error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.put('/elevi/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { name, clasa } = req.body;
    const elevActualizat = await db.elev.update({
      where: { id: id },
      data: {
        name: name,
        clasa: clasa
      }
    })
    res.json(elevActualizat);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.listen(3000, () => {
  console.log("Server is listening on port http://localhost:3000");
})

//npx prisma studio