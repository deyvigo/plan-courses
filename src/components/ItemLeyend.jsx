export const ItemLeyend = ({ color, description }) => {
  return (
    <main className="w-full h-auto flex items-center gap-2 px-4 py-2 border-white odd:border-[1px] first:rounded-t-lg last:rounded-b-lg even:border-l-[1px] even:border-r-[1px]">
      <div className={`w-4 h-4 rounded-full ${color}`}></div>
      <p className="italic">{ description }</p>
    </main>
  )
}