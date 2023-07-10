import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import Apiperfil from "../Services/perfil"

export default function SignUpPage() {
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [nome,setNome] = useState('');
  const [confirm,setConfirm] = useState('');
  const [activede,setActivede] = useState(false)

  const Navigate =useNavigate();

  function subimit(e){
    e.preventDefault();
    setActivede(true);

    if (senha !== confirm){
      setActivede(false);
      alert('Insira a mesma senha no campo "Confirme a senha"');
      return
    }else{
      const body = {nome,email,senha}
      Apiperfil.cadastro(body)
        .then((res)=>Navigate('/'))
        .catch((err)=>{
          setActivede(true)
          console.log(err)
          alert(err.response.data);
          })
    }
  }

  
  return (
    <SingUpContainer>
      <form onSubmit={(e)=>subimit(e)}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text"  value={nome} onChange={(e)=>{setNome(e.target.value)}} required />
        <input placeholder="E-mail" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
        <input placeholder="Senha" type="password" value={senha} onChange={(e)=>{setSenha(e.target.value)}} autoComplete="new-password" required/>
        <input placeholder="Confirme a senha" type="password" value={confirm} onChange={(e)=>{setConfirm(e.target.value)}} autoComplete="new-password" required/>
        <button type="subimit" disabled ={activede} required>Cadastrar</button>
      </form>

      <Link to={'/'}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
