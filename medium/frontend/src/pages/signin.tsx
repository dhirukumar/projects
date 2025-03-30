import { Quorts } from "../component/quorts"
import { Signinauth } from "../component/signinn"
export const Signin= () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
     <div className="">
        <Signinauth/>
     </div>
     <div className="invisible md:visible ">
        <Quorts/>
     </div>
        </div>
        
    )
}