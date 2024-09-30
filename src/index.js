import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { LicenseInfo } from '@mui/x-license'

LicenseInfo.setLicenseKey(
  'c9b6f3099a99a7a03ce2899749db58bbTz05NzQ3NCxFPTE3NTcwMDkxMDcwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLFBWPVEzLTIwMjQsS1Y9Mg=='
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
