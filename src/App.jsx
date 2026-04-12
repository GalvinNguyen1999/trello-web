import Board from '~/pages/Boards/_id'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from '~/pages/404//NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'

function App() {
  return (
    <Routes>
      {/* Redirect root to the first board */}
      <Route path='/' element={<Navigate to='/boards/65a215706b8948401c354667' replace={true} />} />

      {/* Board details */}
      <Route path="/boards/:boardId" element={<Board />} />

      {/* Authentication */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verification' element={<AccountVerification />} />

      {/* 404 Not Found */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
