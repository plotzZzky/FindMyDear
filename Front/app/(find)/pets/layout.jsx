import { Inter } from 'next/font/google'
import NavBar from '@comps/navbar'
import Footer from '@comps/footer'
import PetAppBar from '@comps/petAppBar'
import '../app.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pets encontrados - FindMyDear',
}

export default function RootLayout({ children }) {
  return (
    <section>
      <header>
        <NavBar></NavBar>
        <PetAppBar></PetAppBar>
      </header>

      <main>
        {children}
      </main>
      
      <Footer></Footer>
    </section>
  )
}
