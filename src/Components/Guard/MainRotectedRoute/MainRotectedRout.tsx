import { Navigate } from "react-router-dom"

export default function MainRotectedRout({children}) {
  if(localStorage.getItem('token')) {
    return children
  } else{
    return <Navigate to='/auth/login'/>
  }
  return (
    <div>
      
    </div>
  )
}
