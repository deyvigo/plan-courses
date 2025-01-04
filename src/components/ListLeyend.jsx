import { ItemLeyend } from './ItemLeyend'

export const ListLeyend = () => {
  const listLeyend = [
    {
      color: 'bg-[#578E7E]',
      description: 'Prerequisites',
    },
    {
      color: 'bg-[#973131]',
      description: 'Unlocks Courses',
    },
    {
      color: 'bg-[#754E1A]',
      description: 'Same Cicle',
    }
  ]

  return (
    <div className="w-[90%] h-auto flex flex-col items-center justify-center">
      {
        listLeyend.map(({ color, description }, index) => (
          <ItemLeyend key={index} color={color} description={description} />
        ))
      }
    </div>
  )
}