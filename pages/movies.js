export default function Movies({data, error}){

  if (error) {
    return (
      <div>
        Ocorreu um erro!
      </div>
    )
  }

  if (data.Search) {
    return (
      <div>
        <form>
            <label for='title'>Digite um filme que procura: </label>
            <input id="title" name="title" type="text"/>
            <input type="submit" value="Search"/>
        </form>
        <div>
            {data.Search.map( (m) => <div>{m.Title} --- {m.Year} <img src={m.Poster}/></div>  )} 
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>Não foi encontrado nenhum resultado!</h2>
    </div>
  )
}

export async function getServerSideProps(context){

  const {title} = context.query
  const res = await fetch(`http://www.omdbapi.com/?apikey=aacfdda6&s=${title}`)
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}

async function fetcher(url) {
  const res = await fetch(url)
  const json = await res.json()
  return json
}