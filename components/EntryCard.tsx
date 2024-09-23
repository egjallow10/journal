const EntryCard = ({ entry }) => {
    const date = new Date(entry.createdAt).toDateString()
    console.log(date)
    return (
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5">{entry.createdAt}</div>
        <div className="px-4 py-5">summary</div>
        <div className="px-4 py-4">mood</div>
      </div>
    )
  }
  
  export default EntryCard