import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { LoginContext } from "../providers/loginContext"
import { Link, useNavigate } from "react-router-dom"
import Apitransacao from "../Services/transacao"


export default function HomePage() {
  const { user } = useContext(LoginContext)
  const token = localStorage.getItem('token')
  const authorization = 'Bearer ' + token

  const [transacoes, setTransacoes] = useState([])
  let [saldo,setSaldo] = useState(0);

  const {setUser} = useContext(LoginContext);

  const navigate = useNavigate();

  function entrada() {
    navigate("/nova-transacao/entrada");
  }

  function saida() {
    navigate("/nova-transacao/saida")
  }

  useEffect(() => {
    if (!token){
      navigate('/')
      return
    }

    Apitransacao.gettransacao({ headers: { authorization } })
      .then((res) => { 
        setSaldo(res.data.saldo);
        setTransacoes(res.data.transacoes.reverse()) })
      .catch((err) => { alert(err.response.data) })
  }, [token])
  
  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {user.nome}</h1>
        <BiExit onClick={()=>{
          navigate('/');
          setUser({});
          localStorage.clear();}} data-test="logout"/>
      </Header>

      <TransactionsContainer>
        <ul>
          {transacoes.map((item) => {
            return (
              <ListItemContainer key={item._id}>
                <div>
                  <span>{item.date}</span>
                  <strong data-test="registry-name">{item.descricao}</strong>
                </div>
                <Value color={item.tipo==='entrada'?'positivo':'negativo'} data-test="registry-amount">{String(item.valor.toFixed(2)).replace('.',',')}</Value>
              </ListItemContainer>
            )
          })}
        </ul>
        <article>
          <strong >Saldo</strong>
          <Value color={saldo<0?'negativo':'positivo'} data-test="total-amount">{String(((saldo**(2))**(0.5)).toFixed(2)).replace('.',',')}</Value>
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