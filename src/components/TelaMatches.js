import {Link} from 'react-router-dom';
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { AiOutlineClear } from "react-icons/ai";
import axios from "axios";
import React, { useState, useEffect  } from 'react';
import styled from "styled-components";

const HomeStyle = styled.div`
    padding: 2% 2% 2%;
    display: flex;
    bottom: 50px;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-right: 30px;
    margin-left: 30px;
    border-radius: 2%;
   
`
const DivLink = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 80%;
   

    .perfil{
        width: 30px;
        height: 30px;
        color:#FF1493;

        :hover{
            transform: scale(0.7);
            transition: all 0.2s ease 0s;
        }

        :active{
            background-color: black;
            color: white;
        }
       
        
    }
`
const SelecaoDeMatches = styled.div`
    width: 250px;
    display: block;
    border-radius: 3%;

    .foto{
        width: 50px;
        height: 50px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 30px;
        margin-left: 5%;
        margin-right: 5%;
        position: relative;

    }

    :hover{
            transition: all 0.2s ease 0s;
            cursor: pointer;
            background-color: #D3D3D3;
        }
   
`
const DivDaLista = styled.div`
    display: flex;
    list-style: none;
    width: 100%;
    flex-direction: column-reverse;
     
`  

const Limpar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 80%;
   

    .vassoura{
        width: 30px;
        height: 30px;
        color:#FF1493;

        :hover{
            transform: scale(0.7);
            transition: all 0.2s ease 0s;
        }

        :active{
            background-color: black;
            color: white;
        }
       
        
    }
`
const ImagemTitulo = styled.div`
    width: 100%;
    height: 100%;

    .titulo{
        /* width: 60px; */
        margin-left: 50px;
        color: #FF1493;
    }

 
`

const TelaMatches = (props) => {

const aluno =  "carina";
  
const [matches, setMatches] = useState ([{}]);


useEffect(() => {

    getAllMatches();
  }, {})


const getAllMatches = () => {
    const urlMatches = `https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${aluno}/matches`;
    axios
    .get(urlMatches)
    .then((res) => {
        setMatches(res.data.matches);
    })
    .catch((err) => {
        // alert("Perfil não encontrado");
    });
}

const clearMatches = () => {
   
    const urlclear = `https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${aluno}/clear`;
    axios
    .put(urlclear)
    .then((res)=> {
        getAllMatches()
    })
    .catch((err) => {
    });
}

const matchesList = matches.map((list) => {
    return <SelecaoDeMatches>
            <ul>
                <div>
                    <img class="foto" src={list.photo} />
                    {list.name}
                </div>
            </ul>
          </SelecaoDeMatches>
});
        return (

            <HomeStyle>
                   
                <DivLink>
                     <Link to="/"><AiOutlineUsergroupDelete class="perfil"/></Link>
                </DivLink>

                <ImagemTitulo>
                     <h1 class="titulo">Astromatch ♥ </h1>
                </ImagemTitulo>

                <DivDaLista>
                    <li>
                         {matchesList}
                    </li>
                </DivDaLista>

                <Limpar>
                     <AiOutlineClear class="vassoura" onClick={() => clearMatches()}></AiOutlineClear> 
                </Limpar>

            </HomeStyle>
           
        );
    
}

export default TelaMatches;