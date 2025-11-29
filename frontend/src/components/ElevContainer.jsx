import React from 'react'
import '../styles/ElevContainer.css'

const ElevContainer = ({ id, nume, clasa, onDelete, onView, onAddNote }) => {
  if (!nume) return <div>Încărcare elevi...</div>

  return (  
    <div className='elev-chenar'>

      <div className='buttons-right'>
        <button className='button-viewElev' onClick={() => onView?.(id)} aria-label="Vezi elev">👁️</button>
        <button className="addNote-btn" onClick={() => onAddNote?.(id)} aria-label="Adaugă notă">➕</button>
        <button 
          className="delete-btn"
          onClick={() => {
            if (confirm('Sigur ștergi acest elev?')) {
              onDelete?.(id)
            }
          }}
          aria-label="Șterge elev"
        >
          ✖
        </button>
      </div>


      <div className='elev-info'>
        <h3 className='elev-nume'>{nume}</h3>
        <p className='elev-clasa'>Clasa: {clasa}</p>
      </div>
    </div>
  )
}

export default ElevContainer