import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Author & Developer Credits Console Log Watermark
console.log(
  "%c PORTFOLIO BUILT BY %c\n%c Muhammad Arjuna Mahendratama %c (@cyvix4102 / Arman) ",
  "background: #121212; color: #3b82f6; font-size: 10px; font-weight: bold; padding: 4px 8px; border-top: 1px solid rgba(255,255,255,0.05); border-left: 1px solid rgba(255,255,255,0.05); border-right: 1px solid rgba(255,255,255,0.05); border-radius: 4px 4px 0 0; font-family: monospace;",
  "",
  "background: #3b82f6; color: #ffffff; font-size: 12px; font-weight: bold; padding: 6px 10px; border-radius: 0 0 0 6px; font-family: sans-serif; box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);",
  "background: #1a1a1a; color: #9ca3af; font-size: 11px; padding: 6.5px 10px; border-radius: 0 0 6px 0; border-right: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); font-family: monospace;"
);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
