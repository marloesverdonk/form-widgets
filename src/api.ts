import { Email, Address } from './app'
import { HttpResult, AsyncState, async } from 'widgets-for-react'


export let logInPromise: (logInEmail: string, logInPassword: string) => Promise<HttpResult<string>> = (logInEmail, logInPassword) =>
  (logInEmail === '@' && logInPassword === 'W1') ?
    Promise.resolve({ kind: "result", value: "", status: 200 }) :
    Promise.resolve({ kind: "result", value: "Incorrect email or password", status: 200 })



export let onNextPromise: (emailData: Email) => Promise<HttpResult<string>> = (emailData) =>
  !emailData.email.includes('@') ?
    Promise.resolve({ kind: "result", value: 'Please fill in an emailadres', status: 200 }) :
    !emailData.password || !emailData.password.match(/[A-Z]/g) || !emailData.password.match(/[0-9]/g) ?
     Promise.resolve({ kind: "result", value: 'Please fill in a password (with a capital letter and a number', status: 200 }) :
      emailData.password !== emailData.confirmPassword ?
        Promise.resolve({ kind: "result", value: `Passwords don't match`, status: 200 }) :
    Promise.resolve({ kind: "result", value: "", status: 200 })



export let onSubmitPromise: (addressData: Address) => Promise<HttpResult<string>> = (addressData) =>
  !addressData.number || !addressData.street || addressData.city === 'city' || !addressData.postalCode ?
    Promise.resolve({ kind: "result", value: 'Please fill in all fields', status: 200 }) :
  !addressData.termsAccepted ?
    Promise.resolve({ kind: "result", value: "Please accept the terms", status: 200 }) :
    Promise.resolve({ kind: "result", value: "", status: 200 })


export default logInPromise