import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { LoginContext } from "../providers/loginContext"
import { Link, useNavigate } from "react-router-dom"
import Apitransacao from "../Services/transacao"


export default function HomePage() {
  const { user } = useContext(LoginContext)
  const authorization = 'Bearer ' + user.token

  const [transacoes, setTransacoes] = useState([])

  const navigate = useNavigate();

  function entrada() {
    navigate("/nova-transacao/entrada");
  }

  function saida() {
    navigate("/nova-transacao/saida")
  }

  useEffect(() => {
    Apitransacao.gettransacao({ headers: { authorization } })
      .then((res) => { setTransacoes(res.data) })
      .catch((err) => { alert(err.response.data) })
  }, [])

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {user.nome}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {transacoes.map((item) => {
            return (
              <ListItemContainer key={item._id}>
                <div>
                  <span>{item.date}</span>
                  <strong>{item.descricao}</strong>
                </div>
                <Value color={item.tipo==='entrada'?'positivo':'negativo'}>{item.valor}</Value>
              </ListItemContainer>
            )
          })}

          <ListItemContainer>
            <div>
              <span>30/11</span>
              <strong>Almoço mãe</strong>
            </div>
            <Value color={"negativo"}>120,00</Value>
          </ListItemContainer>

          <ListItemContainer>
            <div>
              <span>15/11</span>
              <strong>Salário</strong>
            </div>
            <Value color={"positivo"}>3000,00</Value>
          </ListItemContainer>
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>2880,00</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button type="button" data-test="new-income" onClick={entrada}>

          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>

        </button>
        <button type="button" data-test="new-expense" onClick={saida}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`