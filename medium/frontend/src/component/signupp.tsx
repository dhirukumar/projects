import { useState } from "react";
import { SignupType } from "dhiru-medium-app";  // Ensure correct export in npm package
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "./base-url";
export const Signupauth = () => {
    const navigate = useNavigate();
    const [post,setpost] = useState<SignupType>({
        email: "",
        password: "",
        username: ""
    });

    async function sendrequest(){
        try{
           const response= await axios.post(`${base_url}/api/v1/signup`,post);
            const token=response.data.jwt;
            localStorage.setItem("token",token);
            navigate("/blog");

            }
            catch(e){
              alert("Invalid input")
            }

    }

    return (
        
        <div className="h-screen mt-20 flex content-center flex-col">
            <div>
                <div className="flex justify-center mb-30">
                    <div className="text-4xl font-semibold">Create an account</div>
                </div>
                
                <div className="mt-10 flex justify-center">
                    <Label label="Username" type={"text"} placeholder="Dhiru Singh..... " onChange={(e) => {
                        setpost({ ...post, username: e.target.value });
                    }} />
                </div>

                <div className="mt-5 flex justify-center">
                    <Label label="Email" type={"text"} placeholder="ankit@gmail....." onChange={(e) => {
                        setpost({ ...post, email: e.target.value });
                    }} />
                </div>

                <div className="mt-5 flex justify-center">
                    {/* for pssword   */}
                    <Label label="Password" type={"password"} placeholder="Enter Your Password" onChange={(e) => {
                        setpost({ ...post, password: e.target.value });
                    }}/>
                </div>
            </div>
            <div>
                <div className="flex justify-center mt-5">
                <button onClick={sendrequest} className="w-64 bg-zinc-900 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded">
                    Sign Up
</button>

                </div>
            </div>

            <div className="flex justify-center text-slate-500 mt-3">
                <div className="pt-1">
                    Already have an account?
                    <Link to="/signin">signin</Link>
                </div>
            </div>
        </div>
    );
};

interface LabelProps {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
}

export function Label({ label, placeholder, onChange,type }: LabelProps) {
    return (
        <div>
            <label className="font-medium font-serif block mb-2 text-1.5xl text-gray-900 ml-2">
                {label}
            </label>
            <input
                onChange={onChange}
                className="w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                           focus:ring-blue-500 focus:border-blue-500 p-2.5 
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                type={type} //this type make the input field password or text you can set type password or text as your need
                required
            />
        </div>
    );
}
