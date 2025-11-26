import React, { useEffect, useState } from 'react'
import axios from 'axios'
import  ElevContainer  from './components/ElevContainer.jsx'
import AdaugareElev from './pages/AdaugareElev.jsx'
import './styles/App.css'

function App() {
  const [elevi, setElevi] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState('list')

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

  if (page === 'add') {
    return (
      <div style={{ maxWidth: 920, margin: '24px auto', padding: 12 }}>
        <button className="back-btn" onClick={() => setPage('list')}>⬅ Înapoi</button>
        <AdaugareElev onCreate={(newElev) => { setElevi(prev => [newElev, ...prev]); setPage('list') }} />
      </div>
    )
  }

  return (
    <div>
      {loading && <p>Loading elevi...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    
        <div className="empty-state">
          <button className="add-elev-btn" onClick={() => setPage('add')}>Adaugă un elev</button>
        </div>
   
      {!loading && !error && elevi.map((e) => (
        <ElevContainer key={e.id} id={e.id} nume={e.name} clasa={e.clasa} onDelete={handleDelete} />
      ))}
    </div>
  )
}

export default App
