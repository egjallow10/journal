const createURL = (path) => {
    return `http://localhost:3000/${path}`
  }
  

  export const createNewEntry = async () => {
    const res = await fetch(
      new Request(createURL('/api/journal'), {
        method: 'POST',
      })
    )
  
    if (res.ok) {
      const data = await res.json()
      return data.data
    }
  }

  
  