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
        setError(err.message || 'Error fetching elevi')
      } finally {
        setLoading(false)
      }
    }

    fetchElevi()
  }, [])

  return (
    <div>
      {loading && <p>Loading elevi...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && elevi.length === 0 && <p>No elevi found.</p>}
      {!loading && !error && elevi.map((e) => (
        <ElevContainer key={e.id} nume={e.name} clasa={e.clasa} />
      ))}
    </div>
  )
}

export default App
