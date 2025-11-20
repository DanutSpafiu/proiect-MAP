import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

//GET elevi
router.get('/', async(req, res) => {
  try{
  const elevi = await prisma.elev.findMany();
  res.json(elevi);
  } catch(error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

//POST elevi
router.post('/', async(req, res) => {
  try {
  const { name, clasa } = req.body;
  //Validate user input
  if(typeof name !== 'string') {
    return res.status(400).json({error: 'Name must be a string'});
  }
  const elevNou = await prisma.elev.create({
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

//GET elev by id
router.get('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const elev = await prisma.elev.findUnique({
      where: {
        id: id
      }
    })
    res.json(elev);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


//PUT elevi
router.put('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { name, clasa } = req.body;
    const elevActualizat = await prisma.elev.update({
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

//DELETE elev
router.delete('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    await prisma.elev.delete({
      where: { id: id }
    })
    res.json({message: 'Elev deleted succesfully'})
  } catch (error) {
    
  }
})

export default router;