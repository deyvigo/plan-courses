import { useState, useEffect } from 'react'
import { Graph } from './components/Graph'
import { SearchBar } from './components/SearchBar'
import { ListLeyend } from './components/ListLeyend'

export const App = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 640)

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <>
      <main className='w-[90%] h-[90%] flex justify-center items-center max-sm:flex-col max-sm:h-full max-sm:w-full'>
        <div className='relative flex-1 h-full flex justify-center items-center max-sm:w-full max-sm:h-auto'>
          <Graph
            radiusCircle={isMobileView ? 1: 2}
            radiusForce={isMobileView ? 1: 2}
            fontSize={isMobileView ? '8px' : '12px'}
            closerTootTip={isMobileView ? 10 : 20}
          />
        </div>
        <div className='w-[400px] h-[60%] p-4 flex flex-col items-center gap-8 max-sm:gap-4 max-sm:w-full max-sm:h-auto'>
          <SearchBar />
          <ListLeyend />
        </div>
      </main>
    </>
  )
}