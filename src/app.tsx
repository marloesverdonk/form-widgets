import * as React from "react"
import { string, stateful, any, div, label, mk_widget, Action, hn, button, AsyncState, unloadedAsyncState, mkWidget, IOWidget, checkbox, Widget, nothing } from "widgets-for-react"
import EmailForm from './components/EmailForm'
import AddressForm from './components/AddressForm'
import LoginForm from './components/LoginForm'

export type State = {
    error: string
} & (SignUp | LoginEmail | Home)

interface Props { }

export interface SignUp {
    step: 'first' | 'second'
    emailData: Email
    addressData: Address
}

export interface Email {
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



const app: Widget<State> = stateful<State>()(
    s0 => any<State>()([
        hn(1, 'hi')().never(),

        s0.step === 'first' ? EmailForm(s0.emailData).map((emailData => ({ ...s0, emailData }))) :
            s0.step === 'second' ? AddressForm(s0.addressData).map((addressData => ({ ...s0, addressData }))) :
                s0.step === 'login' ? LoginForm(s0).map((loginData => ({ ...s0, loginEmail: loginData.loginEmail, loginPassword: loginData.loginPassword }))) :
                    nothing(),

        s0.step === 'first' ? button<State>('next')(() => {
            if (s0.emailData.email.length == 0) return { ...s0, step: 'first' }
            return ({ ...s0, step: 'second' })
        }) :
            s0.step === 'second' ? button<State>('submit')(() => {
                if (s0.addressData.street.length == 0) return { ...s0, step: 'second' }
                return ({ error: s0.error, step: 'login', loginEmail: "", loginPassword: "" })
            }) : nothing()
    ])
)({
    error: "", step: 'first',
    emailData: { email: "", password: "", confirmPassword: "", showPassword: false },
    addressData: { street: "", number: "", postalCode: "", city: "", termsAccepted: false }
})


export default app


