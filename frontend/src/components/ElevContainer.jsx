import React from 'react'
import '../styles/ElevContainer.css'

const ElevContainer = ({ id, nume, clasa, onDelete, onView, onAddNote }) => {
  if (!nume) return <div>Incarcare elevi...</div>

  return (
    <div className='elev-chenar'>
      <button className='button-viewElev' onClick={() => { if (onView) onView(id) }} aria-label="Vezi elev">👁️</button>

      <button
        className="delete-btn"
        onClick={() => {
          if (onDelete) {
            if (confirm('Sigur stergi acest elev?')) onDelete(id)
          }
        }}
        aria-label="Sterge elev"
      >
        ✖
      </button>

        <button
        className="addNote-btn"
        onClick={() => {
          if (onAddNote) onAddNote(id)
        }}
        aria-label="Adauga nota"
      >
        ➕
      </button>

      <div className='elev-info'>
        <h3 className='elev-nume'> {nume}</h3>
        <p className='elev-clasa'>Clasa: {clasa}</p>
      </div>
    </div>
  )
}

export default ElevContainer