import MainHeader from '../../components/Header'
import Footer from '../../components/Footer'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <MainHeader />
      {children}
      <Footer />
    </div>
  )
}
