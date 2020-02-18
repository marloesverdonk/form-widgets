// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';


// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


// import 'babel-polyfill'
import * as React from "react"
import * as ReactDOM from 'react-dom'
import { string, stateful, any, div, label, mk_widget, Action, hn, button, AsyncState, unloadedAsyncState, mkWidget, IOWidget, checkbox, Widget, nothing } from "widgets-for-react"

function renderApp() {

  ReactDOM.render(
    <Main />,
    document.getElementById('example')
  )
}

document.addEventListener("DOMContentLoaded", e => renderApp())

export type State = {
  error: string
} & (SignUp | LoginEmail | Home)

interface Props { }

export interface SignUp {
  step: 'first' | 'second'
  emailData: Email
  addressData: Address
}

interface Email {
  email: string
  password: string
  confirmPassword: string
  showPassword: boolean
}

export interface Address {
  street: string
  number: string
  postalCode: string
  city: string
  termsAccepted: boolean
}

export interface LoginEmail {
  step: 'login'
  loginEmail: string
  loginPassword: string
}

export interface Home {
  step: 'home'
}


const EmailForm: IOWidget<Email, Email> = (s0:Email) => any<Email>()([
    string({id:'email'})(s0.email).map(email => ({ ...s0, email })),
    string({id:'password'})(s0.password).map(password => ({ ...s0, password })),
    string({id:'confirmPassword'})(s0.confirmPassword).map(confirmPassword => ({ ...s0, confirmPassword })),
    checkbox<boolean>({ selected_value:true, unselected_value:false, id:'showPassword'})(s0.showPassword).map(showPassword => ({ ...s0, showPassword})),
  ])

  const AddressForm: IOWidget<Address, Address> = (s0:Address) => any<Address>()([
    string({id:'street'})(s0.street).map(street => ({ ...s0, street })),
    string({id:'number'})(s0.number).map(number => ({ ...s0, number })),
    string({id:'postalCode'})(s0.postalCode).map(postalCode => ({ ...s0, postalCode })),
    string({id:'city'})(s0.city).map(city => ({ ...s0, city })),
    checkbox<boolean>({ selected_value:true, unselected_value:false, id:'termsAccepted'})(s0.termsAccepted).map(termsAccepted => ({ ...s0, termsAccepted})),
  ])


const app: Widget<State> = stateful<State>()(
  s0 => any<State>()([
    hn(1, 'hi')().never(),

    s0.step === 'first' ? EmailForm(s0.emailData).map((emailData => ({ ...s0, emailData}))) : 
    s0.step === 'second' ? AddressForm(s0.addressData).map((addressData => ({ ...s0, addressData}))) : 
    nothing(),

    s0.step === 'first' ?  button<State>('next')(() => {
      if(s0.emailData.email.length == 0) return {...s0, step: 'first'}
      return ({...s0, step: 'second'})
    }) : 
    s0.step === 'second' ?  button<State>('submit')(() => {
      if(s0.addressData.street.length == 0) return {...s0, step: 'second'}
      return ({...s0, step: 'home'})
    }) : nothing()
  ])
)({error: '', step: 'first', 
  emailData: {email: "", password: "", confirmPassword: "", showPassword: false}, 
  addressData: {street: "", number: "", postalCode: "", city: "", termsAccepted: false}})






// const LoginForm = stateful<LoginEmail>()(
//   s0 => any<LoginEmail>()([
//     string({id:'loginEmail'})(s0.loginEmail).map(loginEmail => ({ ...s0, loginEmail })),
//     string({id:'loginPassword'})(s0.loginPassword).map(loginPassword => ({ ...s0, loginPassword })),
//   ])
// )({ loginEmail: '', loginPassword: ''})


class Main extends React.Component<{}, {}> {
  render() {
    return (<div>
      {app.run(console.log)}
  
     
     
      {/* {LoginForm.run(console.log)} */}
      
    </div>)
  }
}

renderApp()












// interface ComponentProps<T> {
//   value: T
//   setValue: (value: T) => void
// }

// type Component<T> = React.FC<ComponentProps<T>>

// const Username: Component<string> = (props) => (
//   <input
//     value={props.value}
//     onChange={e => props.setValue(e.currentTarget.value)}
//   />
// )

// const Email: Component<string> = (props) => (
//   <input
//     type="email"
//     value={props.value}
//     onChange={e => props.setValue(e.currentTarget.value)}
//   />
// )

// const User: Component<User> = props => (
//   <div>
//   <Email
//   value={props.value.email}
//   setValue={(email) => props.setValue({email: email, userName: props.value.userName})}
//   />
//   <Username
//   value={props.value.userName}
//   setValue={(username) => props.setValue({email: props.value.email, userName: username})}/>

//   </div>
// )


// type UserState = {
//   user: AsyncState<User>
// }

// const app = (): JSX.Element =>
//   stateful<UserState>()(s0 =>
//     any<Action<UserState>>()([
//       async<User>()(s0.user).map(a => s1 => ({
//         ...s1,
//         user: a(s1.user)
//       })),
//       mkWidget({
//         run: setState => {

//         }
//       })
//     ]).map(a => a(s0))
//     )({
//       user: unloadedAsyncState()
//     }).run(_ => null)



// class Main extends React.Component<{}, { user: User }> {
//   state = {
//     user: {
//       email: "",
//       userName: ""
//     }
//   }

//   render() {
//     return (
//       <div>
//         <User
//           value={this.state.user}
//           setValue={(user) => this.setState({ user: user })}
//         />

//         {string({})(this.state.user.email).run(email => this.setState({ user: { email: email, userName: this.state.user.userName } }))}
//         {string({})(this.state.user.userName).run(userName => this.setState({ user: { email: this.state.user.email, userName: userName } }))}

//       </div>
//     )
//   }
// }
















{/* {
          SimpleFormExample.run(o => console.log(o))
        } */}

{/* {
          string({ id: "main-input", className: "form-control" })("Just a basic widget")
            .run(o => console.log("Input 1: " + o))
        } */}

{/* {
          stateful<string>()(s =>
            string({ id: "main-input", className: "form-control" })(s)
            )("initial")
            .run(o => console.log("Input 2: " + o))
        } */}



{/* {
          stateful<string>()(s =>
            string({ id: "main-input", className: "form-control" })(s)
          )("String uses state passed from stateful")
          .run(o => console.log("Input 3: " + o))
        } */}

{/* {
          hello_world.run(x => console.log("Callback!", x))
        } */}

{/* {
          hello_world2.run(x => console.log("Callback!", x))
        } */}