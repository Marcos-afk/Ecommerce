import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function Register(props){
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
   
    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';


    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister

  

    function submitHandler(e){
        e.preventDefault()
        if(confirmPassword !== password){
            return alert('senhas não coincidem!')
        }
        dispatch(register( name ,email, password))
    }

    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect)
        }
    }, [props.history , redirect, userInfo])
    
    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                   <h1>Bem vindo a tela de cadastro</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}

                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" placeholder="Digite seu nome aqui" onChange={e => setName(e.target.value)}
                    required/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email"  id="email" placeholder="Digite aqui seu email" 
                    onChange={ e => setEmail(e.target.value)} required/>
                </div>

                <div>
                <label htmlFor="password">Senha</label>
                    <input type="password"  id="password" placeholder="Digite aqui sua senha"
                     onChange={e => setPassword(e.target.value)} required/>

                </div>

                <div>
                <label htmlFor="confirmPassword">Confirmar senha</label>
                    <input type="password"  id="confirmPassword" placeholder="Digite aqui sua senha novamente"
                     onChange={e => setConfirmPassword(e.target.value)} required/>

                </div>

                <div>
                 <label/>   
                <button className="primary" type="submit">Finalizar Cadastro</button>
                </div>

                <div>

                    <div>
                    Já possui uma conta ? {' '}   
                    <Link to={`/sign-in?redirect=${redirect}`}> Fazer login</Link>
                    </div>
                </div>

            </form>


        </div>
    )
}