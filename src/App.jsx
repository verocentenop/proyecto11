import { Route, Routes } from 'react-router-dom'
import './App.css'
import Episodes from './pages/Episodes/Episodes'
import Characters from './pages/Characters/Characters'
import CharacterMatch from './pages/CharacterMatch/CharacterMatch'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Episodes />} />
      <Route path='/episode/:id' element={<Characters />} />
      <Route path='/character-match' element={<CharacterMatch />} />
    </Routes>
  )
}

export default App
