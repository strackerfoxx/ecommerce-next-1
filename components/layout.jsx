import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'

export default function Layout({children}) {
  return (
    <>
        <Header/>
        {children}
        <Footer/>
    </>
  )
}
