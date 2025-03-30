import { Blogcomponent } from "../component/blogcomponent";
import { Appbar } from "../component/appbar";
import { Hooks } from "../hooks/cushooks.tsx";
import { SkeltonForBlogs } from "../component/skeltonforblogs.tsx";
export const Blogs = () => {
    const {blog, loading} = Hooks();
    
    if(loading){
        return (
            <>
                <Appbar write="yes" />
               <SkeltonForBlogs />
            </>
        );
    }

    if(!blog || blog.length === 0) {
        return (
            <>
                <Appbar write="yes" />
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="text-2xl font-semibold mb-4">No blogs found</div>
                    <div className="text-gray-600">Start writing your first blog!</div>
                    <div className="text-gray-600">signin!</div>
                </div>
            </>
        );
    }
        
    return (
        <div>
            <Appbar write="yes"/>
            <div className="flex justify-center mt-4">
                <div className="w-full max-w-4xl px-4">
                    {blog.map((blogs) => (
                        <Blogcomponent 
                            key={blogs.id}
                            id={blogs.id} 
                            name={blogs.author.username || "Guest"}
                            date={blogs.createdAt.slice(0,10)}
                            title={blogs.title} 
                            content={blogs.content}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};