import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();



//Calcul medie pentru un elev la o materie
router.get('/medie/:elevId/:materieId', async(req, res) => {
  try {
    const { elevId, materieId } = req.params;
    const note = await prisma.nota.findMany({
      where: {
        elevId: elevId,
        materieId: materieId
      }
    })
    const total = note.reduce((acc, current) => acc + current.valoare, 0);
    const medie = note.length ? total / note.length : 0;
    res.json({ medie: medie });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

//GET note dupa nume elev
router.get('/elev/:nume', async(req, res) => {
  try {
    const { nume } = req.params;
    const note = await prisma.nota.findMany({
      where: {
        elev: {
          nume: nume
        }
      }
    })
    res.json(note);
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'})
  }
})


// POST note folosind numele materiei
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

//GET note
router.get('/', async(req, res) => {
  try {
    const note = await prisma.nota.findMany();
    res.json(note);
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'})
  }
})

//GET nota by id
router.get('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const nota = await prisma.nota.findUnique({
      where: { id: id }
    })
    res.json(nota);
  } catch (error) {
    
  }
})

//POST nota
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


//PUT nota
router.put('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { valoare, elevId, materieId } = req.body;
    
    const notaActualizata = await prisma.nota.update({
      where: { id: id },
      data: { 
        valoare: valoare,
        elevId: elevId,
        materieId: materieId
      }
    })
    res.json(notaActualizata);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

//DELETE nota
router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  try {
    await prisma.nota.delete({
      where: { id: id }
    })
    res.json({message: 'Nota stearsa cu succes'})
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

export default router;