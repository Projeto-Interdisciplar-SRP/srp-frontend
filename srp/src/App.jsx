import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "../src/componentes/login";
import Cadastro from "../src/componentes/cadastro";
import AuthForm from "../src/componentes/AuthForm";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthForm />
    </>
  )
}

export default App
