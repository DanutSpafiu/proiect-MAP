import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/AdaugaNote.css'

const AdaugaNote = ({ elevId, onCreated, onCancel }) => {
  const [materii, setMaterii] = useState([])
  const [materieId, setMaterieId] = useState('')
  const [valoare, setValoare] = useState(10)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMaterii = async () => {
      try {
        const res = await axios.get('http://localhost:3000/materii')
        const materiiData = res.data || []
        setMaterii(materiiData)
        if (materiiData.length > 0) {
          setMaterieId(materiiData[0].id)
        }
      } catch (err) {
        console.error('Eroare la încărcarea materiilor:', err)
        setError(`Eroare la încărcarea materiilor: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }
    fetchMaterii()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    // Validare
    if (!elevId) {
      setError('Elevul nu este selectat')
      return
    }
    if (!materieId) {
      setError('Selectează o materie')
      return
    }

    setSubmitting(true)
    try {
      // Trimite datele către backend - endpoint-ul POST /note
      const payload = { 
        valoare: Number(valoare), 
        elevId: elevId,        // String (ID-ul elevului)
        materieId: materieId   // String (ID-ul materiei)
      }
      
      console.log('Trimit payload:', payload) 
      
      const res = await axios.post('http://localhost:3000/note', payload)
      const created = res.data
      
      console.log('Nota creată:', created) // Pentru debugging
      
      // Reset form după succes
      setValoare(10)
      if (materii.length > 0) {
        setMaterieId(materii[0].id)
      }
      
      // Callback către componenta părinte
      if (onCreated) {
        onCreated(created)
      }
    } catch (err) {
      console.error('Eroare la adăugarea notei:', err)
      const errorMessage = err?.response?.data?.error || err.message || 'Eroare la salvare'
      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="loading-message">Se încarcă materiile...</div>
  }

  if (materii.length === 0 && !error) {
    return (
      <div>
        <h2 className='titlu'>Adaugă notă</h2>
        <p style={{ color: 'orange', padding: '1rem' }}>
          Nu există materii disponibile. Adaugă mai întâi o materie.
        </p>
        {onCancel && (
          <button type='button' className='back-btn' onClick={onCancel}>
            Înapoi
          </button>
        )}
      </div>
    )
  }

  return (
    <div>
      <h2 className='titlu'>Adaugă notă</h2>
      <div className='chenarElev'>
        <form onSubmit={handleSubmit} className='elev-form'>
          <div className='form-row'>
            <label htmlFor='materie-select' className='label'>
              Materie
            </label>
            <select 
              id='materie-select'
              className='input' 
              value={materieId} 
              onChange={e => setMaterieId(e.target.value)}
              disabled={materii.length === 0}
              required
            >
              {materieId === '' && (
                <option value="" disabled>
                  Selectează o materie
                </option>
              )}
              {materii.map(m => (
                <option key={m.id} value={m.id}>
                  {m.nume}
                </option>
              ))}
            </select>
          </div>

          <div className='form-row'>
            <label htmlFor='nota-select' className='label'>
              Nota (1-10)
            </label>
            <select 
              id='nota-select'
              className='input' 
              value={valoare} 
              onChange={e => setValoare(Number(e.target.value))}
              required
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className='error-message' style={{ 
              color: 'red', 
              backgroundColor: '#fee', 
              padding: '0.75rem', 
              borderRadius: '4px',
              margin: '0.5rem 0',
              border: '1px solid #fcc'
            }}>
              {error}
            </div>
          )}

          <div className='form-actions'>
            <button 
              className='submit-btn' 
              type='submit' 
              disabled={submitting || !elevId || !materieId}
            >
              {submitting ? 'Se salvează...' : 'Salvează nota'}
            </button>
            {onCancel && (
              <button 
                type='button' 
                className='back-btn' 
                onClick={onCancel}
                disabled={submitting}
                style={{ marginLeft: 8 }}
              >
                Anulează
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdaugaNote