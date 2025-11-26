import React, { useState } from 'react'
import axios from 'axios'
import '../styles/AdaugareElev.css'

const AdaugareElev = ({ onCreate }) => {
  const [nume, setNume] = useState('')
  const [clasa, setClasa] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!nume || nume.trim().length === 0) {
      setError('Numele este obligatoriu')
      return
    }

    setSubmitting(true)
    try {
      const payload = { name: nume.trim(), clasa: clasa.trim() }
      const res = await axios.post('http://localhost:3000/elevi', payload)
      const created = res.data
      if (onCreate) onCreate(created)
      setNume('')
      setClasa('')
    } catch (err) {
      console.error('Eroare la creare elev:', err)
      setError(err?.response?.data?.error || err.message || 'Eroare la salvare')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <h2 className='titlu'>Adăugare elev</h2>
      <div className='chenarElev'>
        <form className='elev-form' onSubmit={handleSubmit}>
          <div className='form-row'>
            <label className='label'>Nume complet</label>
            <input className='input' value={nume} onChange={e => setNume(e.target.value)} type='text' name='nume' placeholder='Ex: Ion Popescu' />
          </div>

          <div className='form-row'>
            <label className='label'>Clasa</label>
            <input className='input' value={clasa} onChange={e => setClasa(e.target.value)} type='text' name='clasa' placeholder='Ex: 8A' />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className='form-actions'>
            <button className='submit-btn' type='submit' disabled={submitting}>{submitting ? 'Se salvează...' : 'Salvează'}</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AdaugareElev