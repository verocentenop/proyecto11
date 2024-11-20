import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Loading from '../../components/Loading/Loading'
import Pages from '../../components/Pagination/Pages'
import './Episodes.css'
import { useState, useEffect } from 'react'

const Episodes = () => {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(false)
  const [randomCharacters, setRandomCharacters] = useState({})
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setEpisodes(res.results)

        res.results.forEach((episode) => {
          if (episode.characters.length > 0) {
            const randomUrl =
              episode.characters[
                Math.floor(Math.random() * episode.characters.length)
              ]
            fetch(randomUrl)
              .then((res) => res.json())
              .then((character) => {
                setRandomCharacters((prev) => ({
                  ...prev,
                  [episode.id]: character
                }))
              })
          }
        })
        setLoading(false)
      })
  }, [page])

  return (
    <>
      <Header />
      <main id='main'>
        <div className='game-link'>
          <h3 className='game'>
            <Link to='/character-match'>¿Who are you from Rick and Morty?</Link>
          </h3>
        </div>
        <section>
          {loading && <Loading />}
          {episodes.map((episode) => (
            <Link
              key={episode.id}
              to={`/episode/${episode.id}`}
              state={{
                episodeName: episode.name,
                characters: episode.characters
              }}
              className='card-link'
            >
              <article className='card'>
                <h2>{episode.name}</h2>
                <p className='episode'>{episode.episode}</p>
                <p>{episode.air_date}</p>
                {randomCharacters[episode.id] ? (
                  <img
                    className='card-img'
                    src={randomCharacters[episode.id].image}
                    alt={randomCharacters[episode.id].name}
                  />
                ) : (
                  <Loading />
                )}
              </article>
            </Link>
          ))}
        </section>
        <Pages page={page} setPage={setPage} />
      </main>
    </>
  )
}
export default Episodes
