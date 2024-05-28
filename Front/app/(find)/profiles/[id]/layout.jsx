import { Inter } from 'next/font/google'
import NavBar from '@comps/navbar'
import Footer from '@comps/footer'
import '../../app.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Perfis - FindMyDear',
}

export default function RootLayout({ children }) {
  return (
    <section>
      <header>
        <NavBar></NavBar>
      </header>

      <main>
        {children}
      </main>
      
      <Footer></Footer>
    </section>
  )
}
