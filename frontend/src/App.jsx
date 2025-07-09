import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import App_routes from './routes/App_routes'  
import { UserProvider } from './context/user_context' 

function App() {
  return (
    <>
      <UserProvider>
        <App_routes />
      </UserProvider>
    </>
  )
}

export default App
