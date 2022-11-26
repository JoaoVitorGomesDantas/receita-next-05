export default function Movies({ data }) {
    return (
      <div>
        <style jsx>{`
          div {
            display: flex;
            justify-content: center;    
          }
          img {
            width: 200px;
            height: auto;
            margin: 10px;
            padding: 10px;
            borderRadius: 30px;
          }
          a {
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
            font-family: Arial, Verdana, sans-serif;
            background-color: #aaa;
            border: 1px solid #444;
            border-radius: 15px;
            max-width: 200px;
            list-style: none;
            gap: 15px;
            padding: 25px;
          }
          a li{
            text-align: center;
            padding: 0 5px;
          }
        `}
        </style>
        
        <div>
          <img variant="top"  src={data.Poster}></img><br />
          <a>
            <li>Filme: {data.Title}</li>
            <li>Ano: {data.Year}</li>
            <li>Enredo: {data.Plot}</li>
            <li>Duração: {data.Runtime}</li>
            <li>Diretor: {data.Director}</li>
            <li>País: {data.Country}</li>
          </a>
        </div>
      </div>
    );
}
  
export async function getServerSideProps(context) {
  
    const { imdbID } = context.query;
    const res = await fetch(`http://www.omdbapi.com/?apikey=1ecf8ec3&i=${imdbID}`);
    const data = await res.json();
    
    return {
      props: {
        data,
      },
    };
}