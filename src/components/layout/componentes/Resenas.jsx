// import { Star, StarHalfIcon, StarOffIcon } from 'lucide-react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import React from 'react'

export const Resenas = ({puntuacion, users}) => {
   

    const getStars = () => {
        const stars = [];
    
        for (let i = 1; i <= 5; i++) {
          if (puntuacion >= i) {
            stars.push(<FaStar key={i} className="text-warning" />);
          } else if (puntuacion >= i - 0.5) {
            stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
          } else {
            stars.push(<FaRegStar key={i} className="text-gray-300" />);
          }
        }
    
        return stars;
      };
  return (
    <>
    
    {
        puntuacion > 0 ? 
        <div className="d-flex"  style={{
            alignItems: "center"
        }}>
          <p className='ps-1 m-0 me-2'><small><strong>
             { Number(puntuacion .toFixed(1))}
           </strong></small> </p>

             {getStars()}
             <p className='ps-1 m-0'><small>
             ({users})
                </small> </p>
        </div>
        
        :<div> <small>Sin opiniones</small></div>
    }
    
    </>
  )
}
