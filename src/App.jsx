import React from 'react'
import Hero from './components/Hero'


const App = () => {
  return (
    <div className='relative min-h-screen w-screen overflow-x-hidden'>
      <Hero />
      <section className='min-h-screen w-screen bg-blue-500' />
    </div>
  )
}

export default App