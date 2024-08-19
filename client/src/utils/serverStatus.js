export async function serverStatus() {
  const IP = import.meta.env.VITE_SERVER_IP
  const PORT = import.meta.env.VITE_SERVER_PORT

  return await fetch(`https://mcapi.us/server/status?ip=${IP}&port=${PORT}`)
    .then((r) => r.json())
    .then((response) => {
      console.log(response)
      return response
    })
}
