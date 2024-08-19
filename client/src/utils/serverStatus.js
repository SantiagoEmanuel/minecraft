export async function serverStatus() {
  return await fetch(
    `https://mcapi.us/server/status?ip=172.93.110.127&port=7076`,
  )
    .then((r) => r.json())
    .then((response) => {
      return response
    })
}
