export default function errorLogger(err) {
  console.log(err)
  if (err.response) {
    throw new Error("Client received an error, code (5xx or 4xx)")
  } else if (err.request) {
    throw new Error("Client never received a response, or request never left")
  } else {
    throw new Error("App contains an error. Execution never reached axios")
  }
}
