import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { cors } from 'hono/cors';
import { sign } from 'hono/jwt';
import { BitlyToken } from './bitlytoken';
import axios from 'axios';

interface Env {
  DATABASE_URL: string;
}

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());

app.post('/signup', async (c) => {
  try {
    const body = await c.req.json();

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.create({
      data: { 
        email: body.email, 
        password: body.password 
      },
    });

    const token = await sign({ email: body.email }, 'jwtsecret');

    return c.json({
      token,
    });
    
  } catch (err: any) {
    console.error('Detailed signup error:', {
      message: err.message,
    
    });
    
    return c.json({ 
      error: 'Internal server error during signup',
    }, 500);
  }
});


app.post('/signin', async (c) => {
  try {
    const body = await c.req.json();
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      }
    });

    if (!user) {
      return console.log("user not found");
    }

    if (user.password !== body.password) {
      return console.log("Invalid password");
    }

    const token = await sign({ email: body.email }, 'jwtsecret');
  
    return c.json({
      user: { id: user.id, email: user.email },
      token,
    });
  } catch (err: any) {
    console.error('Detailed signin error:', {
      message: err.message,
    });
    return c.json({ 
      error: 'Internal server error during signin',
    }, 500);
  }
});





app.post("/shorturl", async (c) => {
  const { long_url, domain } = await c.req.json();

  if (!long_url) {
    return c.json({ error: 'long_url is required' }, 400);
  }


  try {
    const response = await axios.post("https://api-ssl.bitly.com/v4/shorten",{
        long_url,
        domain: domain || "bit.ly",
      },{
        headers: {
          Authorization: `Bearer ${BitlyToken}`,
        }
      }
    );

  return c.json({
       link: response.data.link,
      id: response.data.id,
       long_url: response.data.long_url,
      created_at: response.data.created_at
    });
  } catch (error) {
      console.error('Error shortening URL:', error);
    return c.json({ error: 'Failed to shorten URL' }, 500);
  }
});

export default app;
