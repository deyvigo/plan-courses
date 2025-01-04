import { Graph } from './components/Graph'
import { SearchBar } from './components/SearchBar'
import { ListLeyend } from './components/ListLeyend'

export const App = () => {
  return (
    <>
      <main className='w-full h-full flex justify-center items-center'>
        <Graph />
        <div className='w-[40%] h-[80%] p-4 flex flex-col items-center gap-8'>
          <SearchBar />
          <ListLeyend />
        </div>
      </main>
    </>
  )
}