import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1>Sunburst Demos</h1>
    <App />
  </StrictMode>,
)
