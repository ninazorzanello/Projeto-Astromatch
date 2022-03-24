import React, { useState, useEffect  } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import { BsSuitHeart } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineUsergroupAdd, AiOutlineClear } from "react-icons/ai";
import styled from "styled-components";



const HomeStyle = styled.div`
    padding: 2% 2% 2%;
    display: flex;
    bottom: 50px;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-right: 30px;
    margin-left: 30px;
    border-radius: 2%;
`
const BotaoMatches = styled.div`
    display: flex;
    justify-content: space-evenly;
    -webkit-box-align: center;
    align-items: center;
    padding: 20px 0px;
    
`
const BotaoDeuMatche = styled.div`
    border-radius: 30%;
    width: 60px;
    height: 60px;
    color: width;
    background-color: pink;
    font-size: 50px;
    position: relative;
    box-shadow: rgb(205 205 205 / 73%) 0px 0px 15px 0px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-left: 10px;

        :hover{
            transform: scale(0.7);
            transition: all 0.2s ease 0s;
        }

        :active{
            background-color: #D3D3D3;
            color: white;
        }
        .coracao{
            width: 20px;
        }
`

const BotaoSemMatche = styled.div`
    border-radius: 30%;
    width: 60px;
    height: 60px;
    color: black;
    font-size: 50px;
    position: relative;
    box-shadow: rgb(205 205 205 / 73%) 0px 0px 15px 0px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-around;

        :hover{
            transform: scale(0.7);
            transition: all 0.2s ease 0s;
        }

        :active{
            background-color: #D3D3D3;
            color: white;
        }

        .quebrado{
            width: 20px;
        }
`


const DivText = styled.div`  
    margin-right: 20px;
    font-family: Tahoma, Verdana, sans-serif;
`

const DivName = styled.div`
    font-weight: bold;
    font-size: 24px;
    margin-right: 20%;
    font-family: Tahoma, Verdana, sans-serif;
`

const Img = styled.img`
    width: 250px;
    height: 250px;
    display: block;
    z-index: 1;
    border-radius: 3%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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

const ImagemTitulo = styled.div`
    width: 100%;
    height: 100%;

    .titulo{
        margin-left: 50px;
        color: #FF1493;
    }

 
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



const TelaHome = (props) => {

const aluno =  "carina";
    
const [profile, setProfile] = useState ({});
const [choice, setChoice] = useState ([])


useEffect(() => {

    getAllProfile();
  }, [])

const getAllProfile = async () => {
    try{
    const urlProfileToChoose = `https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${aluno}/person`;
    await axios
    .get(urlProfileToChoose)
    .then((res) => {
        setProfile(res.data.profile);
    })
    } catch (err) {
        alert("Perfil não encontrado");
    }
};

const postChoosePerson = async (choice) =>{
    try{
    const body = {
        id: profile.id,
        choice: choice,
      };
    const urlChoosePerson = `https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${aluno}/choose-person`;
    await axios
    .post(urlChoosePerson, body)
    .then((res) => {
        getAllProfile()
    })
    }catch(err) {
        // alert("Algo deu errado, tente novamente")
    }
};

const clearMatches = async () => {
    try{
    const urlclear = `https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${aluno}/clear`;
    await axios
    .put(urlclear)
    .then((res)=> {
        getAllProfile()
    })
    }catch(err) {
    }
};

    return (
       
            <HomeStyle>
                <DivLink>
                    <Link to="/telamatches">
                        <AiOutlineUsergroupAdd class="perfil" />
                    </Link>
                </DivLink>

                <ImagemTitulo>
                    <h1 class="titulo" >Astrometch ♥</h1>
                </ImagemTitulo>
               
                <div>
                    <Img src={profile.photo} /> 
                </div>
                

                <DivName>
                    {profile.name},
                    {profile.age}
                </DivName>

               

                <DivText>
                    {profile.bio}
                </DivText>

               
                   
                <BotaoMatches>

                        <BotaoSemMatche>
                             <AiOutlineClose class="quebrado" onClick={()=> postChoosePerson(false)}></AiOutlineClose>
                        </BotaoSemMatche>

                        <BotaoDeuMatche>
                            <BsSuitHeart class="coracao" onClick={() => postChoosePerson(true)}></BsSuitHeart>
                        </BotaoDeuMatche>

                </BotaoMatches>

                <Limpar>
                    <AiOutlineClear class="vassoura" onClick={() => clearMatches()}></AiOutlineClear> 
                </Limpar>

            </HomeStyle>    
    );
}

export default TelaHome;
