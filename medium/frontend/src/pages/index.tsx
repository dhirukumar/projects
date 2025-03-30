import { Quorts } from "../component/quorts"
import { Signupauth } from "../component/signupp"
export const Signup= () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
     <div className="">
        <Signupauth />
     </div>
     <div className="invisible md:visible ">
        <Quorts />
     </div>
        </div>
        
    )
}