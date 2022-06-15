import React, { useEffect, useState } from "react";
import ContentModal from "../../components/ContentModel/ContentModel";
import "./SingleContent.css";


const SingleContent = ({
  id,
  pokemonIndex,
  name,
  title,
}) => {
  const [pokemonImg, setPokemonImg] =useState([]);
  const [type, setType] =useState([]);
  const PokemonImg = async () => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
      const res = await fetch(url);
      const data = await res.json();
      const imgUrl = [];
      let {
        "official-artwork": {
          front_default
        }
    } = data.sprites.other;
    let elem = data.sprites.other.dream_world.front_default
      for(let i=0;i<1;i++){
        if(elem !== null)
        {
           imgUrl.push(data.sprites.other.dream_world.front_default);
        }

        else {
            imgUrl.push(front_default);
        }
      }
     setPokemonImg(imgUrl);
    } catch (error) {
      console.log(error);
    }
  };
  const PokemonType = async () => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
      const res = await fetch(url);
      const data = await res.json();
      const type = [];
      const typeIconArr = [];
      for(let i=0;i<data.types.length;i++){
           typeIconArr.push(data.types[i].type.name);
          const C=data.types[i].type.name;

          if( C === "bug"){
             type.push("./icons/bug.svg");
          }
          else if(C === "dark"){
            type.push("./icons/dark.svg");
           
          }
          else if(C === "dragon"){
            type.push("./icons/dragon.svg");
           
          }
          else if(C === "electric"){
            type.push("./icons/electric.svg");
           
          }
          else if(C === "fire"){
            type.push("./icons/fire.svg");
           
          }
          else if(C === "fairy"){
            type.push("./icons/fairy.svg");
           
          }
          else if(C === "flying"){
            type.push("./icons/flying.svg");
           
          }
          else if(C === "fighting"){
            type.push("./icons/fighting.svg");
           
          }
          else if(C === "ghost"){
            type.push("./icons/ghost.svg");
           
          }
          else if(C === "grass"){
            type.push("./icons/grass.svg");
           
          }
          else if(C === "ground"){
            type.push("./icons/ground.svg");
           
          }
          else if(C === "ice"){
            type.push("./icons/ice.svg");
           
          }
          else if(C ==="poison"){
            type.push("./icons/poison.svg");
           
          }
          else if(C === "psychic"){
            type.push("./icons/psychic.svg");
           
          }
          else if(C === "rock"){
            type.push("./icons/rock.svg");
           
          }
          else if(C === "steel"){
            type.push("./icons/steel.svg");
           
          }
          else if(C === "water"){
            type.push("./icons/water.svg");
           
          }
          else {
            type.push("./icons/normal.svg");
           
          }

      }
     setType(type);
    } catch (error) {
      console.log(error);
    }
  };
useEffect(() => {
  PokemonImg();
  PokemonType();
  // eslint-disable-next-line
}, []);
  return (
    <ContentModal 
    key={id}
    id={id} 
    pokemonIndex={pokemonIndex}
    name={name} 
    title={title} 
    pokemonImg={pokemonImg}>
    <div>
    
    </div>
    <div className="card" >
    <div className="poke_number">
    <b>{id>=100 ?`#${id}` : id<10 ? `#00${id}` :`#0${id}`}</b>
    </div>
      <img
        className="poke_img"
        src={`${pokemonImg}`}
        alt={"unavailable"}
      />
      <div className="poke_name">
      <b>{name ? name : "unknown"}</b>
      </div>
      <div className="poke_type">
      {
        type.map((e,index)=>{
          return(
            <div key={index} className="poke_type_icon">
            <div className={`circle ${e.split('/')[2].split('.')[0]}`}>
            <img className="icon" src={e}  alt={e} />
            </div>
            <span className="tooltip">{e.split('/')[2].split('.')[0]}</span>
            </div>
            )
        })
      }
      </div>
    </div>
    </ContentModal>
  );
};

export default SingleContent;
