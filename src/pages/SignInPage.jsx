import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import { LoginContext } from "../providers/loginContext.jsx";
import Apiperfil from "../Services/perfil";
import { ThreeDots } from "react-loader-spinner";

export default function SignInPage() {
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [activede,setActivede] = useState(false);

  const {setUser} = useContext(LoginContext);

  const Navigate = useNavigate();
  
  function loginsubimit(e){
    e.preventDefault();
    setActivede(true);

    Apiperfil.login({email,senha})
      .then((res)=>{
        setUser(res.data)
        setActivede(false)

        localStorage.setItem("token",(res.data.token))

        Navigate('/home')
      })
      .catch((err)=>{
        setActivede(false);

        alert(err.response.data)
      })
  }

  
  return (
    <SingInContainer>
      <form onSubmit={(e)=>loginsubimit(e)}>
        <MyWalletLogo />
        <input data-test="email" placeholder="E-mail" type="email"  value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
        <input data-test="password" placeholder="Senha" type="password"  value={senha} onChange = {(e)=>{setSenha(e.target.value)}} autoComplete="new-password" />
        <Botao data-test="sign-in-submit" type='submit' disabled ={activede} required >{activede?(<ThreeDots width={80} height={50} color={'#ffffff'}></ThreeDots>):"Entrar"}</Botao>
      </form>

      <Link to={'/cadastro'}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Botao = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`