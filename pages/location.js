import useSWR from 'swr';

export default function Location() {

  const { data, error } = useSWR('https://extreme-ip-lookup.com/json/?key=kCbsFJdk16GRNvqx4Alz', fetcher );

  if (error) return <div>Ocorreu uma falha na requisição...</div>;
  if (!data) return <div>Carregando...</div>;

  return (
    <div>
      {Object.keys(data).map((info) => (<div><p><b>{info}: </b>{data[info]}</p></div>))}
    </div>
  );
}

async function fetcher(url) {

  const res = await fetch(url);
  const json = await res.json();
  return json;
}