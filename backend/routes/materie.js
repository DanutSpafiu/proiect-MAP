import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

//GET materii
router.get('/', async(req, res) => {
  try {
    const materii = await prisma.materie.findMany();
    res.json(materii);
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'})
  }
})

//POST materie
router.post('/', async(req, res) => {
  try {
    const { nume } = req.body;
    const materieNoua = await prisma.materie.create({
      data: { nume }
    })
    res.json(materieNoua);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

//GET materie by id
router.get('/:id', async(req, res) => {
  try{
  const { id } = req.params;
  const materie = await prisma.materie.findUnique({
    where: {id: id}
  })
  res.json(materie);
}catch(error){
  res.status(500).json({ error: error.message })
}
})


//PUT materie
router.put('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { nume } = req.body;
    const materieActualizata = await prisma.materie.update({
      where: { id: id },
      data: { nume: nume }
    })
    res.json(materieActualizata);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

//DELETE materie
router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  try {
    await prisma.materie.delete({
      where: { id: id }
    })
    res.json({message: 'Materie stearsa cu succes'})
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})
export default router;