import { useState } from "react"
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai"

interface Props {
    onClick: () => void;
}

const Like = ({onClick}: Props) => {
   const [status, setStatus] = useState(false)

   const toggle = ()=>{
       setStatus(!status) // so whatever status is, going to revert it to the opposite
       onClick()
   }

   if (status) return <AiFillHeart color="pink" size={20} onClick={toggle}/>
   return <AiOutlineHeart size={20} onClick={toggle}/>
}

export default Like


