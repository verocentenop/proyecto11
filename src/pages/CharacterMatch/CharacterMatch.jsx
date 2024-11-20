import { useState, useEffect } from 'react'
import './CharacterMatch.css'

const CharacterMatch = () => {
  const [formData, setFormData] = useState({
    origin: '',
    status: '',
    species: '',
    gender: ''
  })
  const [origins, setOrigins] = useState([])
  const [speciesList, setSpeciesList] = useState([])
  const [characters, setCharacters] = useState([]) // Todos los personajes
  const [filteredCharacter, setFilteredCharacter] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAllCharacters = async () => {
      let allCharacters = []
      let page = 1

      try {
        while (true) {
          const response = await fetch(
            `https://rickandmortyapi.com/api/character?page=${page}`
          )
          const data = await response.json()
          allCharacters = [...allCharacters, ...data.results]

          if (!data.info.next) break
          page++
        }

        setCharacters(allCharacters)
        setOrigins([...new Set(allCharacters.map((char) => char.origin.name))])
        setSpeciesList([...new Set(allCharacters.map((char) => char.species))])
      } catch (err) {}
    }

    fetchAllCharacters()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const findCharacter = () => {
    const { origin, status, species, gender } = formData

    const filtered = characters.filter((char) => {
      const isOriginMatch =
        !origin || char.origin.name.toLowerCase().includes(origin.toLowerCase())
      const isStatusMatch =
        !status || char.status.toLowerCase().includes(status.toLowerCase())
      const isSpeciesMatch =
        !species || char.species.toLowerCase().includes(species.toLowerCase())
      const isGenderMatch =
        !gender || char.gender.toLowerCase().includes(gender.toLowerCase())

      return isOriginMatch && isStatusMatch && isSpeciesMatch && isGenderMatch
    })

    if (filtered.length > 0) {
      setFilteredCharacter(filtered[0])
      setError('')
    } else {
      setFilteredCharacter(null)
      setError('No exact matches found. Try refining your criteria.')
    }
  }

  return (
    <div className='character-match'>
      <h2>Which Rick and Morty character are you?</h2>
      <div className='form'>
        <label>
          Origin
          <select
            name='origin'
            value={formData.origin}
            onChange={handleInputChange}
          >
            <option value=''>Any Origin</option>
            {origins.map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select
            name='status'
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value=''>Any Status</option>
            <option value='Alive'>Alive</option>
            <option value='Dead'>Dead</option>
            <option value='unknown'>Unknown</option>
          </select>
        </label>
        <label>
          Species
          <select
            name='species'
            value={formData.species}
            onChange={handleInputChange}
          >
            <option value=''>Any Species</option>
            {speciesList.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
        </label>
        <label>
          Gender
          <select
            name='gender'
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value=''>Any Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Genderless'>Genderless</option>
            <option value='unknown'>Unknown</option>
          </select>
        </label>
        <button className='button-container' onClick={findCharacter}>
          Find your character!
        </button>
      </div>

      {error && <p className='error'>{error}</p>}

      {filteredCharacter && (
        <div className='character-result'>
          <img src={filteredCharacter.image} alt={filteredCharacter.name} />
          <div className='info-text'>
            <h3>{filteredCharacter.name}</h3>
            <p>
              <strong>Status:</strong> {filteredCharacter.status}
            </p>
            <p>
              <strong>Species:</strong> {filteredCharacter.species}
            </p>
            <p>
              <strong>Gender:</strong> {filteredCharacter.gender}
            </p>
            <p>
              <strong>Origin:</strong> {filteredCharacter.origin.name}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CharacterMatch
