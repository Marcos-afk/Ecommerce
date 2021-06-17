import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {deleteUser, listUser} from '../actions/userAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_DETAILS_RESET } from '../constantes/userConstantes'

export default function UserList(props){

    const UserList = useSelector(state => state.UserList)
    const {users, error, loading} = UserList

    const  UserDelete = useSelector( state => state.UserDelete)
    const {loading : loadingDelete, success : successDelete, error: errorDelete} = UserDelete

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(listUser())
        dispatch({ type: USER_DETAILS_RESET})
    }, [dispatch, successDelete])

    function deleteHandler(user){
        if(window.confirm('Deseja apagar esse usuário ?')){
            dispatch(deleteUser(user._id))
        }
    }
    return(
        <div>
            <h1>Lista de usuários</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && (<MessageBox variant="success">Usuário apagado com sucesso</MessageBox>)}
           
            {
                loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                (
                    <table className="table">
                        <thead>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Administrador ?</th>
                        <th>Ações</th>
                        </thead>
                        
                        <tbody>
                        {users.map((user) => (
                         <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? 'Sim' : 'Não'}</td>
                <td>
                  <button type="button" className="small" onClick={ () => props.history.push(`user/${user._id}/edit`)}> Editar </button>
                  <button type="button" className="small" onClick={() => deleteHandler(user)}> Apagar</button>
                </td>
              </tr>
            ))}
                        </tbody>
                    </table>
                )
            }

        </div>
    )

}