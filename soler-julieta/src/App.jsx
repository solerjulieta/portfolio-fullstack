import { Toaster } from 'react-hot-toast'
import AboutMe from './components/AboutMe'
import CompHeader from './components/CompHeader'
import CompNavbar from './components/CompNavbar'
import ContactMe from './components/ContactMe'
import FoundMe from './components/FoundMe'
import MyEducation from './components/MyEducation'
import MyProjects from './components/MyProjects'
import Presentation from './components/Presentation'

function App() {

  return (
    <>
      <CompHeader>
        <CompNavbar/>
      </CompHeader>
      {/*<Presentation />*/}
      <AboutMe />
      <MyEducation />
      <MyProjects />
      <ContactMe />
      <FoundMe />
    </>
  )
}

export default App
