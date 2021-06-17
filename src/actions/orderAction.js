import Axios from "axios"
import { CART_EMPTY } from "../constantes/cartConstantes"
import { ORDER_CREATE_ERROR, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_ERROR, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_ERROR, ORDER_PAY_SUCCESS, ORDER_HISTORIC_REQUEST, ORDER_HISTORIC_ERROR, ORDER_HISTORIC_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_ERROR, ORDER_LIST_SUCCESS} from "../constantes/orderConstante"

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
    try {
      const {
        userSign: { userInfo },
      } = getState()
      const { data } = await Axios.post('/api/order', order, {
        headers: {
          Authorization: `bearer ${userInfo.token}`,
        }
      })
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
      dispatch({ type: CART_EMPTY })
      localStorage.removeItem('cartItems')
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const detailsOrder = (orderId) => async (dispatch, getState) =>{
  dispatch({type : ORDER_DETAILS_REQUEST, payload: orderId})
  
  const {
    userSign: { userInfo },
  } = getState();


  try{
    const { data } = await Axios.get(`/api/order/${orderId}`, {headers :{ Authorization: `bearer ${userInfo.token}`}})
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data})

  }catch(error){
    dispatch({
      type: ORDER_DETAILS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

  }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) =>{
  dispatch({type: ORDER_PAY_REQUEST, payload: {order, paymentResult}})
  const {
    userSign: { userInfo }
  } = getState();

  try{

    const {data} = Axios.put(`/api/order/${order._id}/pay`, paymentResult,  {headers :{ Authorization: `bearer ${userInfo.token}`}})
    dispatch({ type: ORDER_PAY_SUCCESS, payload : data})

  }catch(error){
    dispatch({
      type: ORDER_PAY_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

  }
}

export const historicOrder = () => async (dispatch, getState) =>{
  dispatch({type: ORDER_HISTORIC_REQUEST})
  const {
    userSign: { userInfo }
  } = getState();

  try{
    const {data} = await Axios.get('/api/order/list',  {headers :{ Authorization: `bearer ${userInfo.token}`}})
    dispatch({ type: ORDER_HISTORIC_SUCCESS, payload : data})

  }catch(error){
    dispatch({
      type: ORDER_HISTORIC_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })

  }

}

export const orderList = () => async  (dispatch, getState) =>{
    dispatch ({ type: ORDER_LIST_REQUEST})

    try{

      const {
        userSign: { userInfo }
      } = getState();
      
      const {data} = await Axios.get('/api/order', {headers :{ Authorization: `bearer ${userInfo.token}`}})
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data})

    }catch(error){
      dispatch({ type: ORDER_LIST_ERROR, payload :  error.response && error.response.data.message
        ? error.response.data.message
        : error.message })
    }
}