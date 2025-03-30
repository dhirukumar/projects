import { Avatar } from "./blogcomponent";
import {  useUser } from "../hooks/cushooks";
import { Link } from "react-router-dom";

export const Appbar = ({write="no"}:{write?:"yes"|"no"}) => {
    
    const { user } = useUser();
    const token = localStorage.getItem("token");

    return (
        <div className="sticky top-0 bg-white z-50 shadow-sm">
            <div className="max-w-7xl mx-auto">
                <div className="border-b flex justify-between items-center px-5 py-4">
                    <Link to="/blog" className="flex items-center space-x-1">
                        <div className="text-2xl font-bold font-serif text-gray-800 hover:text-gray-600 transition-colors">
                            Medium
                        </div>
                    </Link>
                    
                    <div className="flex items-center space-x-6">
                        {token && write === "yes" && (
                            <Link to="/publish">
                                <button 
                                    type="button" 
                                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 
                                             font-medium rounded-full text-sm px-5 py-2.5 transition-colors duration-200 
                                             flex items-center space-x-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <span>Write</span>
                                </button>
                            </Link>
                        )}

{/* this is only for user firest name in appbar componenet which use Useuser cushooks */}
                        <div className="flex items-center space-x-1">
                            {token && user ? (
                                <div className="flex items-center space-x-3">
                                    <Avatar size="max" name={user.username || "A"} />
                                    <span className="text-sm font-medium text-gray-700">
                                        {user.username}
                                    </span>
                                </div>
                            ) : (
                                <Link to="/signin">
                                    <button className="text-gray-700 hover:text-gray-900 font-medium text-sm">
                                        Sign In
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};




