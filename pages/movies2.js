import Link from 'next/link';

export default function Movies2({data, error}){

    if (error) return <div>Ocorreu uma falha na requisição...</div>
    if (!data) return <div>Carregando...</div>
  
    if (data.Search) {
      return (
        <div>
          <form>
              <label for='title'>Digite um filme que procura: </label>
              <input id="title" name="title" type="text"/>
              <input type="submit" value="Search"/>
          </form>
          <div>
            {data.Search.map((m) => 
            <div style={{ padding: 8, fontFamily: 'verdana' }} key={m.imdbID}>
              <Link style={{ textDecoration: 'none' }} href={`/onemovie/${m.imdbID}`}>Filme: {m.Title}{' '}</Link> Ano: {m.Year}<img src={m.Poster}/>
            </div>)} 
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