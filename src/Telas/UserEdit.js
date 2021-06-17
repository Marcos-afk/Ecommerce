import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_ADMIN_UPDATE_RESET } from '../constantes/userConstantes'
import { detailsUser, updateUser} from '../actions/userAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function UserEdit(props){

    const userId = props.match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const UserDetails = useSelector( state => state.UserDetails)
    const {user, loading, error} = UserDetails

    const UserAdminUpdate = useSelector( state => state.UserAdminUpdate)
    const {  loading: loadingUpdate, error: errorUpdate, success: successUpdate,} = UserAdminUpdate

    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(successUpdate){
            dispatch({type: USER_ADMIN_UPDATE_RESET})
            document.location.href = '/userlist'
        }

        if(!user){
            dispatch(detailsUser(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, props.history, successUpdate, user, userId])

    function submitHandler(e){
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }
    return(
        <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Editar usuário :  {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            <div>
              <label htmlFor="name">Nome</label>
              <input id="name" type="text" placeholder="Digite seu nome aqui" value={name} onChange={(e) => setName(e.target.value)} required disabled/>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Digite seu email aqui" value={email} onChange={(e) => setEmail(e.target.value)} required disabled/>
            </div>
    
            <div>
              <label htmlFor="isAdmin">Administrador ?</label>
              <input id="isAdmin" type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}/>
            </div>
            <div>
              <button type="submit" className="primary"> Atualizar </button>
            </div>
          </div>
        )}
      </form>
    </div>
        
    )
    
}