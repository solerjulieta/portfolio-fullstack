import AboutMe from './components/AboutMe'
import CompHeader from './components/CompHeader'
import CompNavbar from './components/CompNavbar'
import ContactMe from './components/ContactMe'
import FoundMe from './components/FoundMe'
import MyEducation from './components/MyEducation'
import MyProjects from './components/MyProjects'
import Presentation from './components/Presentation'
import CVDownloadModal from './components/CVDownloadModal'
import { useState } from 'react'

function App() 
{
  const [isCVOpen, setIsCVOpen] = useState(false)

  return (
    <>
      <CompHeader>
        <CompNavbar onDownloadCV={() => setIsCVOpen(true)}/>
      </CompHeader>
      {/*<Presentation />*/}
      <AboutMe onDownloadCV={() => setIsCVOpen(true)} />
      <MyEducation />
      <MyProjects />
      <ContactMe />
      <FoundMe />
      <CVDownloadModal
        isOpen={isCVOpen}
        onClose={() => setIsCVOpen(false)}
      />
    </>
  )
}

export default App
