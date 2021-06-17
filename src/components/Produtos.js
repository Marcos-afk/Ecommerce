import React from 'react'
import Rating from './Rating'
import {Link} from 'react-router-dom'

export default function Produto({item}){
    return(
        <div key={item._id} className="card">
                 
                    <Link to={`/produtos/${item._id}`}>
                        <img className="imagem" src={item.image} alt={item.name} />
                      </Link>
                      <div className="card-body">
                        <Link to={`/produtos/${item._id}`}>
                          <h2>{item.description}</h2>
                        </Link>
                        <Rating rating={item.rating} numReviews={item.numReviews}/>
                        <div className="price">${item.price}</div>
                </div>
                </div>

    )


}