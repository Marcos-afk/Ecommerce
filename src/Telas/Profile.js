
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateProfile } from '../actions/userAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_RESET } from '../constantes/userConstantes'

export default function Profile(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const userSignin = useSelector((state) => state.userSign)
    const { userInfo } = userSignin

    const UserDetails = useSelector(state => state.UserDetails)
    const {user, error, loading} = UserDetails

    const UserUpdate = useSelector ( state => state.UserUpdate)
    const {success : updateSuccess, loading : updateLoading , error : updateError} = UserUpdate

    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(!user){
            dispatch(detailsUser(userInfo._id))
            dispatch({ type: USER_UPDATE_RESET})
        }else{
            setName(user.name)
            setEmail(user.email)
        }
       

    }, [dispatch, userInfo._id, user])

    function submitHandler(e){
        e.preventDefault()
        
        if(password !== confirmPassword){
            alert('As senhas não conferem!')
        }else{
            dispatch(updateProfile({userId: user._id, name, email, password}))
        }
       

    }

    return(
        <div>
         <form className="form" onSubmit={submitHandler}>
                <div>
                   <h1>Perfil do usuário</h1>
                </div>
                {loading ? <LoadingBox></LoadingBox>
                
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                (
                    <>
                    {updateLoading && <LoadingBox></LoadingBox>}
                    {updateSuccess && (<MessageBox variant="success">Dados atualizados com sucesso</MessageBox>)}
                    {updateError && (<MessageBox variant="danger">{updateError}</MessageBox>)}
                    <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" placeholder="Digite seu nome aqui" value={name}
                    required onChange={ e => setName(e.target.value)}/>
                    </div>
                    
                    <div>
                    <label htmlFor="email">Email</label>
                    <input type="email"  id="email" placeholder="Digite aqui seu email" value={email} 
                    required onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password"  id="password" placeholder="Digite aqui sua senha"
                     required onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <div>
                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <input type="password"  id="confirmPassword" placeholder="Digite aqui sua senha novamente"
                     required onChange={e => setConfirmPassword(e.target.value)}/>

                    </div>

                <div>
                 <label/>   
                <button className="primary" type="submit">Atualizar Dados</button>
                </div>
                <div>
                    <h2>    Perfil criado em : {user.createdAt.substring(0, 10)}  || Pefil atualizado em: {user.updatedAt.substring(0,10)}  </h2>
                </div>
             
                </>
                )    
                }


            </form>
            
        </div>
    )
}