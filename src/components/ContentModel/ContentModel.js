import React, { useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import "./ContentModel.css";
import { GiMale } from "react-icons/gi";
import { BsGenderFemale } from "react-icons/bs";
import { Img1, Img2 } from "../../Config/Config";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "100%",
    height: "95%",
    backgroundColor: "#10141f",
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModel({
  children,
  id,
  pokemonIndex,
  name,
  title,
  pokemonImg,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [pokAbilities, setPokAbilities] = useState([]);
  const [evolution, setEvolution] = useState([]);
  const [genera, setGenera] = useState();
  const [genderRate, setGenderRate] = useState();
  


  const fetchGenderRate = (genderRate) => {
    switch (genderRate) {
      case 0:
        return (
          <div className="gender">
            <span className="male">
              100%{" "}
              <div className="male_icon">
                <GiMale />
              </div>
            </span>
            <span className="female">
              {" "}
              0%{" "}
              <div className="female_icon">
                <BsGenderFemale />
              </div>
            </span>
          </div>
        );
      case 1:
        return (
          <div className="gender">
            <span className="male">
              87.5%{" "}
              <div className="male_icon">
                <GiMale />
              </div>
            </span>
            <span className="female">
              {" "}
              12.5%{" "}
              <div className="female_icon">
                <BsGenderFemale />
              </div>
            </span>
          </div>
        );
      case 2:
        return (
          <div className="gender">
            <span className="male">
              75%{" "}
              <div className="male_icon">
                <GiMale />
              </div>
            </span>
            <span className="female">
              {" "}
              25%{" "}
              <div className="female_icon">
                <BsGenderFemale />
              </div>
            </span>
          </div>
        );
      case 3:
        return (
          <div className="gender">
            <span className="male">
              62.5%{" "}
              <div className="male_icon">
                <GiMale />
              </div>
            </span>
            <span className="female">
              {" "}
              37.5%{" "}
              <div className="female_icon">
                <BsGenderFemale />
              </div>
            </span>
          </div>
        );
      case 4:
        return (
          <div className="gender">
            <span className="male">
              50%
              <div className="male_icon">
                {" "}
                <GiMale />
              </div>
            </span>
            <span className="female">
              {" "}
              50%{" "}
              <div className="female_icon">
                <BsGenderFemale />
              </div>
            </span>
          </div>
        );
      case 5:
        return (
          <div className="gender">
            <span className="male">
              37.5%{" "}
              <div className="male_icon">
                <GiMale />
              </div>
            </span>
            <span className="female">
              {" "}
              62.5%{" "}
              <div className="female_icon">
                <BsGenderFemale />
              </div>
            </span>
          </div>
        );
      case 6:
        return (
          <div className="gender">
            <span className="male">
              25%{" "}
              <div className="male_icon">
                <GiMale />
              </div>
            </span>
            <span className="female">
              {" "}
              75%{" "}
              <div className="female_icon">
                <BsGenderFemale />
              </div>
            </span>
          </div>
        );
      case 7:
        return (
          <div className="gender">
            <span className="male">
              12.5%{" "}
              <div className="male_icon">
                <GiMale />
              </div>
            </span>
            <span className="female">
              {" "}
              87.5%{" "}
              <div className="female_icon">
                <BsGenderFemale />
              </div>
            </span>
          </div>
        );
      case 8:
        return (
          <div className="gender">
            <span className="male">
              0%{" "}
              <div className="male_icon">
                <GiMale />
              </div>
            </span>
            <span className="female">
              {" "}
              100%{" "}
              <div className="female_icon">
                <BsGenderFemale />
              </div>
            </span>
          </div>
        );
      default:
        return <span>Data Not Available...</span>;
    }
  };

  const Pokemon = async () => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
      const res = await fetch(url);
      const data = await res.json();
      const abilities = [];
      const statistics = [];
      const height = data.height;
      const weight = data.weight;
      for (let i = 0; i < data.abilities.length; i++) {
        abilities.push(data.abilities[i].ability.name);
      }
      for (let j = 0; j < data.stats.length; j++) {
        const Obj = {};
        Obj["stat__name"] = data.stats[j].stat.name;
        Obj["stat__val"] = data.stats[j].base_stat;
        statistics.push(Obj);
      }
      const myNew = {
        abilities,
        statistics,
        height,
        weight,
      };
      setPokAbilities(myNew);
    } catch (error) {
      console.log(error);
    }
  };
  const evolutionChain = async () => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon-species/${title}`;
      const res = await fetch(url);
      const data = await res.json();
      let url2 = data.evolution_chain.url;
      const res2 = await fetch(url2);
      const data2 = await res2.json();
      setGenderRate(data.gender_rate);

      const evoChain = [];
      let evoData = data2.chain;

      do {
        const evoDetails = evoData["evolution_details"][0];

        evoChain.push({
          name: evoData.species.name,
          url: evoData.species.url,
          min_level: !evoDetails ? 1 : evoDetails.min_level,
          trigger_name: !evoDetails ? null : evoDetails.trigger.name,
          item: !evoDetails ? null : evoDetails.item,
        });
        evoData = evoData["evolves_to"][0];
      } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
      setEvolution(evoChain);
    } 
    catch (error) {
      console.log(error);
    }
  };

  const PokemonDescription = async () => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon-species/${title}`;
      const res = await fetch(url);
      const data = await res.json();
      let description;
      let genera;
      for (let i = 0; i < data.flavor_text_entries.length - 1; i++) {
        if (data.flavor_text_entries[i].language.name === "en") {
          description = data.flavor_text_entries[i].flavor_text;
          break;
        }
      }
      for (let j = 0; j < data.genera.length; j++) {
        if (data.genera[j].language.name === "en") {
          genera = data.genera[j].genus;
          break;
        }
      }
      setContent(description);
      setGenera(genera);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Pokemon();
    PokemonDescription();
    evolutionChain();
    
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        color="inherit"
        className="pokemon_card"
      >
    <IconButton className="info_icon" onClick={handleOpen}>
    <InfoIcon />
    </IconButton>
      {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="contentModel">
              <div className="contentModal_details">
                <div className="contentModal_title">
                  <b>{id>=100 ?`#${id}` : id<10 ? `#00${id}` :`#0${id}`}</b>
                </div>
                <div className="contentModal_poke_name">
                  <b>{name}</b>
                </div>
                <div className="poke_type">{genera ? genera : "unknown"}</div>
                <div className="contentModal_poke_img">
                  <img alt={title} src={`${pokemonImg}`} />
                </div>
                <div className="poke_height">
                  <b>Height: </b>
                  <span>{pokAbilities.height / 10} m</span>
                </div>
                <div className="poke_weight">
                  <b>Weight: </b>
                  <span>{pokAbilities.weight / 10} kg</span>
                </div>
                <div className="poke_gender">
                  {genderRate === -1
                    ? "Genderless"
                    : fetchGenderRate(genderRate)}
                </div>
              </div>
              <div className="contentModal_content">
                <div className="CloseIcon">
                  <IconButton onClick={handleClose}>
                    <CloseIcon fontSize="large" style={{ color: "white" }} />
                  </IconButton>
                </div>
                <div className="about">
                  <h2>About</h2>
                  <p>{content ? content : "Data Not Available..."}</p>
                </div>
                <div className="contentModal_abilities">
                  <h2>Abilities</h2>
                  <div className="abilities_container">
                    {pokAbilities.abilities &&
                      pokAbilities.abilities.map((e, index) => {
                        return (
                          <li key={index} className="abilities">
                            {`${e}`}
                            <br />
                          </li>
                        );
                      })}
                  </div>
                </div>
                <div className="contentModal_Base_Stats">
                  <h2>Base Stats</h2>
                  <p className="Base_Stats_container">
                    {pokAbilities.statistics &&
                      pokAbilities.statistics.map((e, index) => {
                        return (
                          <li key={index} className="Base_Stats">
                            {`${e.stat__name}: ${e.stat__val}`}
                            <br />
                          </li>
                        );
                      })}
                  </p>
                </div>
                <div className="contentModal_evolution">
                  <h2>Evolution</h2>
                  <br />
                  <div className="evolution_container">
                    {evolution &&
                      evolution.map((e, index) => {
                        return (
                       
                          <div key={index} className="evolution">
                          <div className="pokemon_img">
                          <img className="poke_img_back" src="./pokemon_bg.png" alt="pokemon_bg"/>
                            <div className={`circle poke_img_circle`}>
                            <img
                                className="poke_img_front"
                                src={e.url.split("/")[6] <649 ? `${Img1}/${e.url.split("/")[6]}.svg`: `${Img2}/${e.url.split("/")[6]}.png`} 
                                alt={`${e.name}.svg`}
                              />
                             </div>
                            </div>
                            <br />
                            <span className="evolution_name">{e.name}</span>
                          </div>
                          
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
