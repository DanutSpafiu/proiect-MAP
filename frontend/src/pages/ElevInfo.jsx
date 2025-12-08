import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/ElevInfo.css'

const ElevInfo = ({ elev, reloadKey }) => {
  const [note, setNote] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNote = async () => {
      if (!elev) {
        setNote([])
        setLoading(false)
        return
      }
      try {
        const [resNotes, resMaterii] = await Promise.all([
          axios.get('http://localhost:3000/note'),
          axios.get('http://localhost:3000/materii')
        ])
        const all = resNotes.data || []
        const materii = resMaterii.data || []
        const materiiMap = Object.fromEntries(materii.map(m => [m.id, m.nume]))
        const filtered = all
          .filter(n => n.elevId === elev.id)
          .map(n => ({ ...n, materieName: materiiMap[n.materieId] || n.materieId }))
        setNote(filtered)
      } catch (err) {
        setError(err.message || 'Eroare la încărcarea notelor')
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [elev, reloadKey])

  const calculateAverage = () => {
    if (note.length === 0) return 0
    const sum = note.reduce((acc, n) => acc + n.valoare, 0)
    return (sum / note.length).toFixed(2)
  }

  const groupedNotes = note.reduce((acc, n) => {
    const materie = n.materieName || n.materieId
    if (!acc[materie]) {
      acc[materie] = []
    }
    acc[materie].push(n)
    return acc
  }, {})

  const getGradeColor = (valoare) => {
    if (valoare >= 8) return 'grade-excellent'
    if (valoare >= 5) return 'grade-average'
    return 'grade-poor'
  }

  if (!elev) {
    return (
      <div className="empty-state-container">
        <div className="empty-state-card">
          <div className="empty-icon">👤</div>
          <p className="empty-text">Niciun elev selectat</p>
        </div>
      </div>
    )
  }

  return (
    <div className="elev-info-modern">
      <div className="header-card">
        <div className="student-header">
          <div className="avatar-circle">
            {elev.name.charAt(0).toUpperCase()}
          </div>
          <div className="student-details">
            <h2 className="student-name">{elev.name}</h2>
            <p className="student-class">Clasa {elev.clasa}</p>
          </div>
        </div>
        
        {note.length > 0 && (
          <div className="average-badge">
            <p className="average-label">Media generală</p>
            <p className="average-value">{calculateAverage()}</p>
            <p className={`promotion-status ${parseFloat(calculateAverage()) >= 4.5 ? 'promovat' : 'nepromovat'}`}>
              {parseFloat(calculateAverage()) >= 4.5 ? 'Promovat' : 'Nepromovat'}
            </p>
          </div>
        )}
      </div>

      {loading && (
        <div className="loading-card">
          <div className="spinner"></div>
          <p>Se încarcă notele...</p>
        </div>
      )}

      {error && (
        <div className="error-card">
          <span className="error-icon">⚠️</span>
          <div>
            <h3 className="error-title">Eroare</h3>
            <p className="error-message">{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && note.length === 0 && (
        <div className="empty-notes-card">
          <div className="empty-icon-large">📝</div>
          <h3 className="empty-title">Nicio notă încă</h3>
          <p className="empty-subtitle">Nu există note pentru acest elev.</p>
        </div>
      )}

      {!loading && !error && note.length > 0 && (
        <div className="subjects-container">
          {Object.entries(groupedNotes).map(([materie, noteMaterie]) => {
            const average = (noteMaterie.reduce((acc, n) => acc + n.valoare, 0) / noteMaterie.length).toFixed(2)
            
            return (
              <div key={materie} className="subject-card">
                <div className="subject-header">
                  <h3 className="subject-name">{materie}</h3>
                  <div className="subject-average">
                    <p className="subject-average-label">Medie</p>
                    <p className="subject-average-value">{average}</p>
                  </div>
                </div>
                
                <div className="grades-grid">
                  {noteMaterie.map((n) => (
                    <div key={n.id} className={`grade-card ${getGradeColor(n.valoare)}`}>
                      <div className="grade-value">{n.valoare}</div>
                      <div className="grade-date">
                        {new Date(n.data).toLocaleDateString('ro-RO', { 
                          day: '2-digit', 
                          month: 'short' 
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!loading && !error && note.length > 0 && (
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon stat-icon-blue">📊</div>
            <div className="stat-content">
              <p className="stat-label">Total note</p>
              <p className="stat-value">{note.length}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon stat-icon-purple">📚</div>
            <div className="stat-content">
              <p className="stat-label">Materii</p>
              <p className="stat-value">{Object.keys(groupedNotes).length}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon stat-icon-green">🏆</div>
            <div className="stat-content">
              <p className="stat-label">Nota maximă</p>
              <p className="stat-value">{Math.max(...note.map(n => n.valoare))}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ElevInfo