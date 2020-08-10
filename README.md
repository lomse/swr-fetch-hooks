## SWR FETCH HOOKS

[swr-fetch-hooks repository on github](https://github.com/lomse/swr-fetch-hooks)

### Installation
```
npm i swr-fetch-hooks or yarn add swr-fetch-hooks
```

### How to use useFetch
```
import { useFetch } from 'swr-fetch-hooks'

const fetcher = url => fetch(url).then(r => r.json())

function App () {
  const { setTriggerFetch, data, error } = useFetch('/api/data', fetcher)
  
  if (error) {
    return (
      <a href="# " onClick={() => setTriggerFetch(true)}>
          Try again.
        </a>
    )
  }

  if (!data) {
    return ( // display a loader
      <Loader />
    )
  }

  return (
    <div>
      {data.map((record, index)=> (
        <p key={index}>{record}</p>
      ))}
    </div>
  )
}
```

### How to use useFetchInfinite
```
import { useFetchInfinite } from 'swr-fetch-hooks'

const url = 'http://localhost:5000/get-data'
const fetcher = (url: string) => fetch(url).then(r => r.json())

const {data, error, mutate, size, setSize, isValidating, setTriggerFetch} = useFetchInfinite(url, fetcher)

if (!data) return 'loading'

if(error) {
  <a href="# " onClick={() => setTriggerFetch(true)}>
    Try again.
  </a>
}

return (
  <div>
    {data.map((record, index)=> <p key={index}>{record}</p>)} 
    <button onClick={() => setSize(size + 1)}>Load more</button>
  </div>
)
```

### How to use useFetchPerPage
```
const url = `http://localhost:5000/get-data?PerPage=100`
const fetcher = (url: string) => fetch(url).then(r => r.json())

const { setTriggerFetch, data, error, fetchData, page } = useFetchPerPage(url, fetcher)

if (error) {
  return (
    <a href="# " onClick={() => setTriggerFetch(true)}>
      Try again.
    </a>
  )
}

if (!data) {
  return ( // display a loader
    <Loader />
  )
}

return ( 
  <div>
    {data.map((record, index)=> <p key={index}>{record}</p>)} 
    {page > 1 && <button onClick={() => fetchData(page - 1)}>Previous</button>>
    
    <button onClick={() => fetchData(page + 1)}>Next</button>
  </div>
)

```