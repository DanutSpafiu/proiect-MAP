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

//POST materii
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

//PUT materii
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
export default router;