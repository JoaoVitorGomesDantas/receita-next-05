export default function Movies({ data}) {

    if (data.Error) return <div>Nenhum filme foi encontrado</div>;
    
    if (data.Search) return (
      <div>
          <form>
              <input placeholder="Pesquise o título do filme aqui..." id="text" name="text" type="text" onSearch={() => {}} enterButton />
              <input type="submit" value="Pesquisar" />
          </form>
          <div>
              { data.Search.map( (m) => <div><button type="text" key={m.imdbID} href={`/onemovie/${m.imdbID}`}>{m.Title} --- {m.Year}</button></div> )}               
          </div>
      </div>
  )
  return (
  <div>
      <h1 type="text">Sem resultados</h1>
  </div>)
}

export async function getServerSideProps(context) {

  const { key } = context.query
  try {
    const res = await fetch(`http://www.omdbapi.com/?apikey=aacfdda6&s=${key}`)
    const data = await res.json()

    return {
      props: {
          data
      }
    }
  } catch(err) {
    return {
      props: {
          error:`${err}`
      }
    }
  }
}