import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/ElevInfo.css'

const ElevInfo = ({ elev }) => {
  const [note, setNote] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNote = async () => {
      if (!elev) {
        setNote([])
        setLoading(false)
        return
      }
      try {
        const [resNotes, resMaterii] = await Promise.all([
          axios.get('http://localhost:3000/note'),
          axios.get('http://localhost:3000/materii')
        ])
        const all = resNotes.data || []
        const materii = resMaterii.data || []
        const materiiMap = Object.fromEntries(materii.map(m => [m.id, m.nume]))
        const filtered = all
          .filter(n => n.elevId === elev.id)
          .map(n => ({ ...n, materieName: materiiMap[n.materieId] || n.materieId }))
        setNote(filtered)
      } catch (err) {
        setError(err.message || 'Eroare la încărcarea notelor')
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [elev])

  if (!elev) return <div>Elev not selected</div>

  return (
    <div className='elev-info-container'>
      <h2 className='titlu'>Note pentru {elev.name}</h2>

      {loading && <p>Se încarcă note...</p>}
      {error && <p style={{ color: 'red' }}>Eroare: {error}</p>}

      {!loading && !error && note.length === 0 && <p>Nu există note pentru acest elev.</p>}

      {!loading && !error && note.length > 0 && (
        <div className='chenarElev'>
          <ul>
            {note.map(n => (
              <li key={n.id}>Materie: {n.materieName || n.materieId} — Nota: {n.valoare}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ElevInfo