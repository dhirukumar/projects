import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
// hono has ther own jwt 
import { cors } from 'hono/cors'
import {sign,verify} from "hono/jwt"
import { signinInput, signupInput, createPostInput, updatePostInput } from "dhiru-medium-app"
import { authMiddleware } from './middelware';



//with binding you can tell ts that this is DATABASE_URL is string type
// you can tell hono when databse_url is used it is string type so the don't show the error
// const app = new Hono<{import { signinInput, signupInput, createPostInput, updatePostInput } from "@100xdevs/common-app"
//   Bindings:{
//     DATABASE_URL:string,
//     JWT_SECRET:string
//   }
// ,
// variables:{
//   user:string
// }
// }>();
  
const app = new Hono();
// *** if ts show the error and if you want to stop the error the you put this (//@ts-ignore) above the line of code that is showing the error


//you can define middelware here and make a seprate file for middelware and import it here
// app.use("/api/v1/blog",async (c,next)=>{
// // @ts-ignore
//   const token=c.req.headers("Authorization") || ""

//   const main=token.split(" ")[1]

// const tokenn=await verify(main,"secret")
//   if(tokenn.email){
//     c.json({
//       message:"Authorized access"
//     })
//     // @ts-ignore
//      c.set("user",tokenn.email)
//     return next() 
//   }
//   else{
//     return c.json({
//       message:"Unauthorized access"
//     })
//   }
// })

// cores in hono
app.use('/*', cors())

//  *********Static Routes (First)******V.V.I

// Signup route
app.post('/api/v1/signup', async (c) => {
  //you should not acces .env file outside this route you need to get the value of DATABASE_URL inside every route beacuse this c variable is only available in this route not outside this route
 const prisma = new PrismaClient({
   // @ts-ignore
   datasourceUrl: c.env?.DATABASE_URL	,
 }).$extends(withAccelerate());
 const body = await c.req.json();
 
 const { success } = signupInput.safeParse(body);
 if (!success) {
   c.status(400);
   return c.json({ error: "invalid input" });
 }
 try {
   const user = await prisma.user.create({
     data: {
       email: body.email,
       password: body.password,
       // @ts-ignore
       username: body.username
     }
   });
   const jwt = await sign({ id: user.id }, "secret");//this "secret" is the secret key that is used to sign the jwt token you can put this in wranglr file also
   return c.json({ jwt
    });
 } catch(e) {
   c.status(403);
   return c.json({ error: "error while signing up" });
 }
})



// Signin route
app.post('/api/v1/signin',async (c) => {
  const prisma=new PrismaClient({
    // @ts-ignore
    datasourceUrl:c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  const body=await c.req.json();
  const safe=signinInput.safeParse(body)
  if(!safe.success){
    return c.json({
      message:"Invalid input"
    })
  }
  const find=await prisma.user.findUnique({
    where:{
      email:body.email,
      password:body.password
    }
  })
  if(!find){
    c.status(403);
    return c.json({
      message:'User not found'
    })
  }
  
  const tok=await sign({id:find.id},"secret")

  return c.json({
  tok
  }); 
});

//get all blogs
app.get('/api/v1/blog/bulk',authMiddleware, async (c) => {
  try {
    const prisma = new PrismaClient({
      // @ts-ignore
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            username: true,  // Only works if `author` relation is defined
          },
        },
      },
    });
    
    return c.json({ posts });
  } catch (error) {
    // @ts-ignore
    return c.json({ error: "Internal Server Error", details: error.message }, 500);
  }
});


// Get current user
app.get('/api/v1/user/me', authMiddleware, async (c) => {
  try {
    // @ts-ignore
    const userId = c.get("userid");

    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const prisma = new PrismaClient({
      // @ts-ignore
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      // @ts-ignore
      where: { id: userId.id },
      select: {
        username: true
      }
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});


//  ************Dynamic Routes (Second)****************V.V.I



// post a new blog
app.post("/api/v1/blog", authMiddleware, async (c) => {
  try {
    // @ts-ignore
    const userId = c.get("userid");

    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const prisma = new PrismaClient({
      // @ts-ignore
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    console.log("Request body:", body); 

    const validation = createPostInput.safeParse(body);
    if (!validation.success) {
      return c.json({ error: "Invalid input", details: validation.error }, 400);
    }
    // @ts-ignore
const main=userId.id;
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        // @ts-ignore
        authorId:main,
      },
    });

    console.log("Post created:", post); 

    return c.json({ post, message: `Blog created by user ${main}` });
  } catch (error) {
    console.error("Error creating post:", error);
    // @ts-ignore
    return c.json({ error: "Internal Server Error", details: error.message }, 500);
  }
});



// Get a single blog post by ID
app.get('/api/v1/blog/:id', authMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    console.log("Requested Post ID:", id);

    if (!id) return c.json({ error: "Invalid ID" }, 400);

    const prisma = new PrismaClient({
      // @ts-ignore
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            username: true
          }
        }
      }
    });

    console.log("Fetched Post:", post);

    if (!post) {
      return c.json({ message: 'Post not found' }, 404);
    }

    return c.json({ post });

  } catch (error) {
    console.error("Error fetching blog post:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

// Update an existing blog
app.put('/api/v1/blog/:id', authMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    // @ts-ignore
    const userId = c.get("userid");
    
    console.log("Requested Post ID:", id);

    if (!id) return c.json({ error: "Invalid ID" }, 400);

    const prisma = new PrismaClient({
      // @ts-ignore
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const existingPost = await prisma.post.findUnique({ 
      where: { id },
      include: {
        author: true
      }
    });

    console.log("Fetched Post:", existingPost);

    if (!existingPost) {
      return c.json({ error: "Post not found" }, 404);
    }

    // Check if the user is the owner of the post
    // @ts-ignore
    if (existingPost.authorId !== userId.id) {
      return c.json({ error: "Unauthorized: You can only update your own posts" }, 403);
    }

    const body = await c.req.json();
    const validation = updatePostInput.safeParse(body);
    if (!validation.success) {
      console.error("Validation failed:", validation.error);
      return c.json({ error: "Invalid input", details: validation.error }, 400);
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
      },
      include: {
        author: {
          select: {
            username: true
          }
        }
      }
    });
    console.log("Updated Post:", updatedPost);

    return c.json({ message: "Blog updated", post: updatedPost });

  } catch (error) {
    console.error("Error updating blog:", error);
    // @ts-ignore
    return c.json({ error: "Internal Server Error", details: error.message }, 500);
  }
});


export default app;










