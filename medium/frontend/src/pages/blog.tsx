import { Appbar } from "../component/appbar";
import { Avatar } from "../component/blogcomponent";
import { Useblog } from "../hooks/cushooks";
import { Link, useParams } from "react-router-dom";
import { blogsskelton } from "../component/skeltonforblog";
export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = Useblog({ id: id || "" });

    return (
        <div>
        
            <Appbar write="yes" />
           
            {loading ? (
                blogsskelton()
            ) : blog ? (
                <div>
                    <div className="grid grid-cols-12 px-10 w-full pt-10 max-w-screen-2xl mx-auto">
                        <div className="col-span-8">
                            <div className="">
                                <div className="text-5xl font-extrabold mb-4">{blog.title}</div>
                            </div>
                            <div className=" text-gray-500 mb-4">
                                {blog.createdAt && new Date(blog.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <div className="">
                                <div className="text-lg mb-4">
                                    {blog.content}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-4">
    <Avatar name={blog.author?.username || "A"} size="small" />
    <div className="flex flex-col">
        <div className="font-medium">Author</div>
        <div className="text-gray-600">{blog.author?.username || "Anonymous"}</div>
    </div>
</div>
<div className="flex font-medium mb-2 mt-4">Published on 
                                <div className=" text-gray-500 mb-2 ml-2">
                                {blog.createdAt && new Date(blog.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                                </div>
         <div className="font-mono">Random catch phrase about author's ability to grab user's attention</div>
        </div>


{/* this button is for update the existing post for owner */}
<div className=" mt-8 ml-8">
<Link to={`/update/${id}`}>
<button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
  Update
</button>
</Link>
</div>

                        </div>
                        
                    </div>
                </div>
            ) : (
                <div className="text-center text-xl mt-5">Firest you need to signin</div>
            )}
        </div>
    );
};


