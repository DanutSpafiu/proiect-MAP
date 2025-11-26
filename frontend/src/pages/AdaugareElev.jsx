import React from 'react'
import '../styles/AdaugareElev.css'

const AdaugareElev = () => {
  return (
    <>
      <h2 className='titlu'>Adăugare elev</h2>
      <div className='chenarElev'>
        <form className='elev-form' onSubmit={(e) => e.preventDefault()}>
          <div className='form-row'>
            <label className='label'>Nume complet</label>
            <input className='input' type='text' name='nume' placeholder='Ex: Ion Popescu' />
          </div>

          <div className='form-row'>
            <label className='label'>Clasa</label>
            <input className='input' type='text' name='clasa' placeholder='Ex: 8A' />
          </div>
          
               
          <div className='form-actions'>
            <button className='submit-btn' type='submit'>Salvează (demo)</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AdaugareElev