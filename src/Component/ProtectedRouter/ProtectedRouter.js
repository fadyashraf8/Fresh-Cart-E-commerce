import { Navigate } from "react-router-dom";


export function ProtectedRouter(props) {

    if (localStorage.getItem("token") === null){
     return   <Navigate to="/login"/>
    }else{
      return  props.children
    }
}

export function InverseProtectedRouter(props) {

    if (localStorage.getItem("token") !== null){
      return  <Navigate to="/home"/>
    }else{
      return  props.children
    }


}