import React from 'react'
import '../styles/ElevContainer.css'
const ElevContainer = ({ id, nume, clasa, onDelete }) => {
  if(!nume) {
    return (
      <div>Incarcare elev...</div>
    )
    }
    return (
      <div className='elev-chenar'>
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
        <h3 className='elev-nume'>
          👤 {nume}
        </h3>
        <p className='elev-clasa'>
          Clasa: {clasa}
        </p>

      </div>
    )
}

export default ElevContainer