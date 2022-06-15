import React,{useEffect,useState} from 'react';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import "./HomePage.css"

const HomePage=() =>{
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const getAllPokemon = async () => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon?limit=${20}&offset=${20*(page-1)}`;
      const res = await fetch(url);
      const data = await res.json();
      setContent(data.results);
      
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAllPokemon();
    // eslint-disable-next-line
  }, [page]);
  
  return (
    <div className='pokemon-container'>
      <div className="pokemon-wrapper">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.url.split('/')[6]}
              id={c.url.split('/')[6]}
              pokemonIndex={c.url.split('/')[6]}
              name={c.name}
              title={c.name.split('-')[0]}
            />
          ))}
      </div>
      {content.length > 1 && (
          <CustomPagination setPage={setPage} />
        )}
  </div>
  )
}

export default HomePage