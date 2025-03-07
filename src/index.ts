console.log("Server is running on", Bun.env.NODE_ENV)
Bun.serve({
  port: 3000,
  
  fetch(req) {
    return new Response('Hello, World!')
  }
})