import './Pages.css'

const Pages = ({ page, setPage }) => {
  return (
    <div className='pages'>
      <div className='button-container'>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          {'<'}{' '}
        </button>
        <p>{page}</p>
        <button disabled={page === 3} onClick={() => setPage(page + 1)}>
          {'>'}{' '}
        </button>
      </div>
    </div>
  )
}

export default Pages
