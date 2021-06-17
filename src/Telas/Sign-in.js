import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SignAction } from '../actions/userAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function SignIn(props){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
   
    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userSignin = useSelector((state) => state.userSign);
    const { userInfo, loading, error } = userSignin


    function submitHandler(e){
        e.preventDefault()
        dispatch(SignAction(email, password))
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
                   <h1>Faça o login para prosseguir</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
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
                 <label/>   
                <button className="primary" type="submit">Fazer Login</button>
                </div>

                <div>

                    <div>
                    Novo usuário ? {' '}   
                    <Link to={`/register?redirect=${redirect}`}> Fazer cadastro</Link>
                    </div>
                </div>

            </form>


        </div>
    )
}