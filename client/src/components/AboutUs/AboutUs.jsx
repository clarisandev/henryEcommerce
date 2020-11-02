import React from 'react'
import './AboutUs.css'
import img from './recycle.jpeg'
import insta from './insta.png'
import face from './face.png'


const AboutUs = () => {

    return (
    <div>
        <div className='socialmediaMenu'>    
       
                     
            <ul>    
                 <li className='text-seg'> Nuestras Redes Sociales </li>        
                <li><a href='#'><img className="insta" src={face} alt=""/></a></li>
                <li><a href='#'><img className="insta" src={insta} alt=""/></a></li>                      
            </ul>          
            
            </div>
        <div className='aboutUsContainer'>
             


            <div className='aboutUsText'>
                La cosería surge como un emprendimiento de amigos pensado como una forma de reciclaje,
                para que puedas invertir en cosas que ya no usas, o nunca lo hiciste
                y así darles una segunda oportunidad. Ganas vos, gana el ambiente.
            </div>
            </div>

 <div className='aboutUsImg'>
     <img src={img} alt=""/>
 </div>
 {/* <div className='socialmediaMenu'>Seguinos
            <ul>
                <li><a href='#'><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                <li><a href='#'><i className='fa fa-instagram' ></i></a></li>                      
            </ul>          
            
            </div> */}


        </div>

        
    )

}

export default AboutUs