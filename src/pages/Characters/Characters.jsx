import { useNavigate, useParams } from 'react-router-dom'
import './Characters.css'
import { useEffect, useState } from 'react'

const Characters = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [episode, setEpisode] = useState(null)
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
      .then((res) => res.json())
      .then((episodeData) => {
        setEpisode(episodeData)

        const characterData = []
        const fetchCharacters = async () => {
          for (const url of episodeData.characters) {
            await fetch(url)
              .then((res) => res.json())
              .then((data) => {
                characterData.push(data)
              })
          }
          setCharacters(characterData)
          setLoading(false)
        }
        fetchCharacters()
      })
  }, [id])

  return (
    <>
      <div className='characters'>
        <div className='div-title'>
          {episode && (
            <>
              <h2 className='char-title'>Characters of this episode:</h2>
            </>
          )}
          <button onClick={() => navigate('/')} className='button-container'>
            Back to episodes
          </button>
        </div>
        <div className='character-list'>
          {characters.map((character) => (
            <div key={character.id} className='character-card'>
              <div className='char-img'>
                <img src={character.image} alt={character.name} />
              </div>
              <div className='info'>
                <h4>{character.name}</h4>
                <p>
                  <span>Status:</span> {character.status}
                </p>
                <p>
                  <span>Species: </span>
                  {character.species}
                </p>
                <p>
                  <span>Origin: </span>
                  {character.origin.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Characters
