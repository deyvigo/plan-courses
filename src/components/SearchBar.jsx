import { useState } from 'react'
import { IconSearch } from './IconSearch'
import { useDataStore } from '../store/dataStore'

export const SearchBar = () => {
  const [value, setValue] = useState('')
  const { data, circles, setListTooltips } = useDataStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    setListTooltips([])
    
    circles
      .attr('fill', '#8D77AB')
      .attr('stroke', '#F9F6E6')
    
    if (value === '') return

    const filtered = data.filter(d => d.name.toLowerCase().includes(value.toLowerCase()))
    circles
      .filter(d => d.name.toLowerCase().includes(value.toLowerCase()))
      .attr('fill', '#16C47F')

    setListTooltips(filtered.map((f) => {
      return {
        name: f.name,
        x: f.x,
        y: f.y,
        id: f.id,
      }
    }))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] flex justify-center items-center border-[1px] border-white rounded-lg gap-2 px-2"
    >
      <button>
        <IconSearch />
      </button>
      <div className="w-[1px] h-[60%] bg-white"></div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-full flex-1 outline-none bg-transparent p-2"
        type="text"
        placeholder="Type some course name ..."
      />
    </form>
  )
}