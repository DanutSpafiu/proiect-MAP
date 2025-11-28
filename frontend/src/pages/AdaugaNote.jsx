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
        setMaterii(res.data || [])
        if (res.data && res.data.length) setMaterieId(res.data[0].id)
      } catch (err) {
        setError('Eroare la încărcarea materiilor', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMaterii()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!elevId) return setError('Elevul nu este selectat')
    if (!materieId) return setError('Selectează o materie')

    setSubmitting(true)
    try {
      const payload = { valoare: Number(valoare), elevId, materieId }
      const res = await axios.post('http://localhost:3000/note', payload)
      const created = res.data
      if (onCreated) onCreated(created)
    } catch (err) {
      console.error('Eroare la adaugarea notei', err)
      setError(err?.response?.data?.error || err.message || 'Eroare la salvare')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div>Se încarcă materiile...</div>

  return (
    <div>
      <h2 className='titlu'>Adaugă notă</h2>
      <div className='chenarElev'>
        <form onSubmit={handleSubmit} className='elev-form'>
          <div className='form-row'>
            <label className='label'>Materie</label>
            <select className='input' value={materieId} onChange={e => setMaterieId(e.target.value)}>
              {materii.map(m => (
                <option key={m.id} value={m.id}>{m.nume}</option>
              ))}
            </select>
          </div>

          <div className='form-row'>
            <label className='label'>Nota</label>
            <select className='input' value={valoare} onChange={e => setValoare(Number(e.target.value))}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className='form-actions'>
            <button className='submit-btn' type='submit' disabled={submitting || !elevId}>{submitting ? 'Se salvează...' : 'Salvează nota'}</button>
            <button type='button' className='back-btn' onClick={() => onCancel && onCancel()} style={{ marginLeft: 8 }}>Anulează</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdaugaNote