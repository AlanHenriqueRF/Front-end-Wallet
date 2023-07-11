import { useContext, useState } from "react"
import { useNavigate, useParams, useSubmit } from "react-router-dom"
import styled from "styled-components"
import { LoginContext } from "../providers/loginContext";
import Apitransacao from "../Services/transacao";
import { ThreeDots } from "react-loader-spinner";

export default function TransactionsPage() {
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [activede, setActivede] = useState(false)

  const Navigate = useNavigate()

  const { user } = useContext(LoginContext)
  const token = localStorage.getItem('token')

  const tipo = useParams();

  function produtoSubimit(e) {
    e.preventDefault()
    setActivede(true);
    const authorization = 'Bearer ' + token

    Apitransacao.posttransacao({ valor:Number(valor), descricao, tipo: tipo.tipo },{ headers:{ authorization }})
      .then((res) => {
        setActivede(false)
        Navigate('/home')
      })
      .catch((err) => {
        setActivede(false)
        //console.log(err)
        alert(err.response.data)
      })
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo.tipo}</h1>
      <form onSubmit={(e) => produtoSubimit(e)}>
        <input data-test="registry-amount-input" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} type="text" required />
        <input data-test="registry-name-input" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} type="text" required />
        <Botao data-test="registry-save" type="submit" disabled={activede} required>{activede?<ThreeDots width={80} height={50} color={'#ffffff'}></ThreeDots>:`Salvar ${tipo.tipo}`}</Botao>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`

const Botao = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`
