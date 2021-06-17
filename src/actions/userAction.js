import Axios from "axios"
import { USER_ADMIN_UPDATE_ERROR, USER_ADMIN_UPDATE_REQUEST, USER_ADMIN_UPDATE_SUCCESS, USER_DELETE_ERROR, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_ERROR, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_ERROR, USER_LIST_REQUEST, 
    USER_LIST_SUCCESS, 
    USER_REGISTER_ERROR, USER_REGISTER_REQUEST, USER_REGISTER_SUCESS, USER_SIGNIN_ERROR, USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCESS, USER_SIGNOUT, USER_UPDATE_ERROR, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } 
    from "../constantes/userConstantes"

export const SignAction = (email, password) => async (dispatch)=>{
    dispatch({ 
        type: USER_SIGNIN_REQUEST,
        payload: {email , password}
    })

    try{
        const {data} = await Axios.post('/api/users/sign-in', {email, password})
        dispatch({
            type: USER_SIGNIN_SUCESS,
            payload: data
        })
        localStorage.setItem('userInfo' , JSON.stringify(data))
    }catch(error){
        dispatch({ 
            type: USER_SIGNIN_ERROR,
            payload: error.response && error.response.data.message ?
            error.response.data.message 
            :
            error.message
        })

    }

}

export const SignOutAction = () => (dispatch)=>{
   localStorage.removeItem('userInfo')
   localStorage.removeItem('cartItems')
   localStorage.removeItem('shippingAddress')
   dispatch({type : USER_SIGNOUT})
   document.location.href = '/sign-in'
}

export const register = (name, email, password) => async (dispatch)=>{
    dispatch({ 
        type: USER_REGISTER_REQUEST,
        payload: {email , password}
    })

    try{
        const {data} = await Axios.post('/api/users/register', {name, email, password})
        dispatch({
            type: USER_REGISTER_SUCESS,
            payload: data
        })
        dispatch({
            type: USER_SIGNIN_SUCESS,
            payload: data
        })
        localStorage.setItem('userInfo' , JSON.stringify(data))
    }catch(error){
        dispatch({ 
            type: USER_REGISTER_ERROR,
            payload: error.response && error.response.data.message ?
            error.response.data.message 
            :
            error.message
        })

    }

}

export const detailsUser = (UserId) => async (dispatch, getState) =>{
    dispatch({ type: USER_DETAILS_REQUEST, payload: UserId})
    const {
        userSign: { userInfo }
      } = getState();
     
      try{

        const {data} = await Axios.get(`/api/users/${UserId}`, {headers :{ Authorization: `bearer ${userInfo.token}`}})
        dispatch({type: USER_DETAILS_SUCCESS, payload: data})

      }catch(error){
        dispatch({ 
            type: USER_DETAILS_ERROR,
            payload: error.response && error.response.data.message ?
            error.response.data.message 
            :
            error.message
        })


      }

}

export const updateProfile = (user) => async (dispatch, getState)=>{
    dispatch({ type: USER_UPDATE_REQUEST, payload: user})
    const {
        userSign: { userInfo }
      } = getState();
     
      try{

        const {data} = await Axios.put(`/api/users/update`, user, {headers :{ Authorization: `bearer ${userInfo.token}`}})
        dispatch({ type: USER_UPDATE_SUCCESS, payload : data})
        dispatch({ type: USER_SIGNIN_SUCESS, payload : data})
        localStorage.setItem('userInfo', JSON.stringify(data))
        document.location.href = '/profile'

      }catch(error){
          dispatch({ type: USER_UPDATE_ERROR, payload: error.response && error.response.data.message ?
            error.response.data.message 
            :
            error.message})
      }

}

export const listUser = () => async (dispatch, getState) =>{

      dispatch({ type: USER_LIST_REQUEST})
      try{

        const {
            userSign: { userInfo }
        } = getState()

        const {data} = await Axios.get('/api/users', {headers :{ Authorization: `bearer ${userInfo.token}`}})
        dispatch({ type: USER_LIST_SUCCESS, payload : data})
        

      }catch(error){
        dispatch({ type: USER_LIST_ERROR, payload: error.response && error.response.data.message ?
            error.response.data.message 
            :
            error.message})

      }

}

export const updateUser = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_ADMIN_UPDATE_REQUEST, payload: user });
    const {
      userSign: { userInfo },
    } = getState();
    
    try {
      const { data } = await Axios.put(`/api/users/${user._id}`, user, {
        headers: { Authorization: `bearer ${userInfo.token}` },
      })
      dispatch({ type: USER_ADMIN_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_ADMIN_UPDATE_ERROR, payload: error.response && error.response.data.message ?
        error.response.data.message 
        :
        error.message})
    }
  }

  export const deleteUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const {
      userSign: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.delete(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      dispatch({ type: USER_DELETE_SUCCESS, payload: data })
      document.location.href = '/userlist'
    } catch (error) {
      dispatch({ type: USER_DELETE_ERROR, payload: error.response && error.response.data.message ?
        error.response.data.message 
        :
        error.message })
        document.location.href = '/userlist'
    }
  };