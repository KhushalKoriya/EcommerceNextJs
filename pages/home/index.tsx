import React from 'react'
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

const Index = ({ children }: any) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
export default Index;
