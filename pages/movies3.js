import useSWR from 'swr'
import {useState} from 'react'
import Link from 'next/link'

export default function Movies3(){

    const [url, setUrl] = useState('')
    const {data, error} = useSWR(url, theFetcher)
    const onClickHandler = (e) => {

        e.preventDefault()
        if (url === '') setUrl('http://www.omdbapi.com/?apikey=aacfdda6&s=bagdad')
        else setUrl('')
    }

    return (
        <div>
            <TheLink url={url} handler={onClickHandler}/>
            <TheMovies data={ error?{error:'Erro na pesquisa'}: data ? data: {Search:''} } show={url !== ''}/>
        </div>
    )
}

async function theFetcher(url) {

    if (url === null || url === '') return {Search:''}

    const res = await fetch(url);
    const json = await res.json();
    return json;
}

export function TheMovies({data,show}){

    if (!show) return (<div></div>)    
    if (data.error) return (<div>Ocorreu uma falha na requisição</div>)
    if (data.Search === '' ) return (<div>Carregando...</div>)

    return (
        <div>
          <style jsx>{`
            img {
                flex-direction: column;
                justify-content: center;
            }
            
            div {
                display: flex;
                font-family: Arial, Verdana, sans-serif;
                
            }`}
          </style>

          {data.Search.map((m) => 
          <div style={{ padding: 8 }} key={m.imdbID}>
            <Link style={{ textDecoration: 'none' }} href={`/onemovie/${m.imdbID}`}><img src={m.Poster}/>Filme: {m.Title} | Ano: {m.Year}{' '}</Link>
          </div>)}            
        </div>
    )
}

export function TheLink({url, handler}){    

    return (
        <div>
            <button type="primary" href="/searchmovies/[key].js">Pesquisar filme</button>
            <button type="link" href="/movies3.js" onClick={handler}>{url === '' ? 'Mostrar' : 'Ocultar'} </button>
        </div>
    )
}