import { Inter } from 'next/font/google'
import NavBar from '@comps/navbar'
import Footer from '@comps/footer'
import PeopleAppBar from '@/app/components/peopleAppBar'
import '../app.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pessoas encontradas - FindMyDear'
}

export default function RootLayout({ children }) {
  return (
    <section>
      <header>
        <NavBar></NavBar>
        <PeopleAppBar></PeopleAppBar>
      </header>

      <main>
        {children}
      </main>
      
      <Footer></Footer>
    </section>
  )
}
