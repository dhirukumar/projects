
import { base_url } from '../component/base-url';
import axios from 'axios';
import { useEffect, useState } from 'react';


// this is for only user firest letter in appbar
export type usertype = {
    "username": string
}

export const useUser = () => {
    const [user, setUser] = useState<usertype | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        axios.get(`${base_url}/api/v1/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setUser(res.data.user);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
        });
    }, []);

    return {
        loading,
        user
    };
};


// this is for getting all post
export type blogtype = {
    "id":string,
    "title": string,
    "content": string,
    "createdAt": string,
    "author": {
        "username": string
    }
}
export const Hooks = () => {
    const [loading, setLoading] = useState(true);
    const [blog, setblog] = useState<blogtype[]>([]);

    useEffect(() => {
        console.log("Fetching blogs...");
        axios.get(`${base_url}/api/v1/blog/bulk`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    ).then((res) => {
            console.log("Received blog data:", res.data);
            setblog(res.data.posts)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        });
    }, [])
    
    return {
        loading,
        blog
    }
}

// this is for getting only one post with there id
export const Useblog = function({id}: {id?: string}) {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<blogtype>();

    useEffect(() => {
        axios.get(`${base_url}/api/v1/blog/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    ).then((res) => {
            setBlog(res.data.post)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching blog:", error);
            setLoading(false);
        });
    }, [id])
    
    return {
        loading,
        blog
    }
}



// this is for only user firest letter in appbar
export type posttype = {
    "title": string,
    "content": string,
}

export type PostInput = {
    title: string;
    content: string;
}

export const useCreatePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createPost = async (postData: PostInput) => {
        setLoading(true); 
        setError(null);
        
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }

            const response = await axios.post(
                `${base_url}/api/v1/blog`,
                postData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setLoading(false);
            return response.data;
        } catch (err) {
          // @ts-ignore 
            setError(err.message || "Failed to create post");
            setLoading(false);
            throw err;
        }
    };

    return {
        createPost,
        loading,
        error
    };
};