const createURL = (path) => {
    return `http://localhost:3000/${path}`
  }

  export const updateEntry = async (id, content) => {
    const res = await fetch(
      new Request(createURL(`/api/journal/${id}`), {
        method: 'PATCH',
        body: JSON.stringify({ content }),
      })
    )
  
    if (res.ok) {
      const data = await res.json()
      return data.data
    }
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


  export const deleteEntry = async (id) => {
    const res = await fetch(
      new Request(createURL(`/api/journal/${id}`), {
        method: 'DELETE',
      })
    );
  
    if (res.ok) {
      return { success: true };
    }
    return { success: false };
  };
  
  