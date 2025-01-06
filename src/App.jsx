import { Graph } from './components/Graph'
import { SearchBar } from './components/SearchBar'
import { ListLeyend } from './components/ListLeyend'

export const App = () => {
  return (
    <>
      <main className='w-[90%] h-[90%] flex justify-center items-center max-sm:flex-col max-sm:h-full max-sm:w-full'>
        <div className='relative flex-1 h-full flex justify-center items-center max-sm:w-full max-sm:h-auto'>
          <Graph radiusCircle={1} radiusForce={1} fontSize={'8px'} closerTootTip={10}/>
        </div>
        <div className='w-[400px] h-auto p-4 flex flex-col items-center gap-8 max-sm:gap-4'>
          <SearchBar />
          <ListLeyend />
        </div>
      </main>
    </>
  )
}