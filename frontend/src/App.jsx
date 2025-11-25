import React, { useEffect, useState } from 'react'
import axios from 'axios'
import  ElevContainer  from './components/ElevContainer.jsx'

function App() {
  const [elevi, setElevi] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchElevi = async () => {
      try {
        const res = await axios.get('http://localhost:3000/elevi')
        setElevi(res.data || [])
      } catch (err) {
        setError(err.message || 'Eroare la încărcarea elevilor')
      } finally {
        setLoading(false)
      }
    }

    fetchElevi()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/elevi/${id}`)
      setElevi((prev) => prev.filter((el) => el.id !== id))
    } catch (err) {
      console.error('Eroare la stergerea elevului:', err)
      setError(err.message || 'Eroare la stergerea elevului')
    }
  }

  return (
    <div>
      {loading && <p>Loading elevi...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && elevi.length === 0 && <p>Niciun elev găsit.</p>}
      {!loading && !error && elevi.map((e) => (
        <ElevContainer key={e.id} id={e.id} nume={e.name} clasa={e.clasa} onDelete={handleDelete} />
      ))}
    </div>
  )
}

export default App
