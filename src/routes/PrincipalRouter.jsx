import { useEffect } from "react"
import { Outlet } from "react-router-dom"

const PrincipalRouter = props => {



    useEffect(() => {
      
      
    }, [])
    
    return (

        <div className="">

            <Outlet/>
        </div>
    )
}

export default PrincipalRouter;