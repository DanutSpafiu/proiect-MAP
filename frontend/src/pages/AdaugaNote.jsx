import React, { useState } from 'react'
import axios from 'axios'
import '../styles/AdaugaNote.css'
const AdaugaNote = ({onCreate}) => {
  const [nota, setNota] = useState('')
  const [materie, setMaterie] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  return (
    const handleSubmit = async(e) => {
    e.preventDefault()
    setError(null)
    if (!nota || nota.trim().length === 0) {
      setError('Nota este obligatorie')
      return
    }

    setSubmitting(true)
    try {
      const payload = { valoare: nota.trim(), materieId: materie.trim() }
    } catch (error) {
      
    }
    <>
    
    </>
  )
}

export default AdaugaNote