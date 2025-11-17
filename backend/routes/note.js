import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

//GET note
router.get('/', async(req, res) => {
  try {
    const note = await prisma.nota.findMany();
    res.json(note);
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'})
  }
})

//POST note
router.post('/', async(req, res) => {
  try {
    const { valoare, elevId, materieId } = req.body;
    const notaNoua = await prisma.nota.create({
      data: { 
        valoare, 
        elevId, 
        materieId 
      }
    })
    res.json(notaNoua);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

router.post("/", async (req, res) => {
  try {
    const { valoare, elevId, materieId } = req.body;

    const nota = await prisma.nota.create({
      data: {
        valoare,
        elevId,
        materieId
      }
    });

    res.json(nota);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST note by name
router.post("/by-name", async (req, res) => {
  try {
    const { valoare, elevId, materie } = req.body;

    // Cauta materia dupa nume, daca nu exista, o creeaza
    let materieObj = await prisma.materie.findUnique({
      where: { nume: materie }
    });

    if (!materieObj) {
      materieObj = await prisma.materie.create({
        data: { nume: materie }
      });
    }

    const nota = await prisma.nota.create({
      data: {
        valoare,
        elevId,
        materieId: materieObj.id
      }
    });

    res.json(nota);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;