import React from 'react'
import './ElevContainer.css'
const ElevContainer = ({ nume, clasa }) => {
  if(!nume) {
    return (
      <div>Incarcare elev...</div>
    )
    }
    return (
      <div className='elev-chenar'>

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