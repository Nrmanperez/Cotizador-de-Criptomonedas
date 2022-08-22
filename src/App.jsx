
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingLayout from './components/layouts/LandingLayout'
import { Quote } from './components/sections/Quote'
import { Toplist } from './pages/TopList'

import Landing from './pages/Landing'

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/top-list"
            element={
              <LandingLayout>
                <Toplist />
              </LandingLayout>
            }
          />
          <Route
            path="/quoter"
            element={
              <LandingLayout>
                <Quote />
              </LandingLayout>
            }
          />
        </Routes>
      </Router>
  )
}
