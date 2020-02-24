import * as React from "react"
import { string, stateful, any, div, label, mk_widget, Action, hn, button, AsyncState, unloadedAsyncState, mkWidget, IOWidget, checkbox, Widget, nothing, async, loadingAsyncState, some } from "widgets-for-react"
import EmailForm from './components/EmailForm'
import AddressForm from './components/AddressForm'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import { onNextPromise, onSubmitPromise, logInPromise, } from './api'

export type State = {
    AsyncState: AsyncState<string>
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

const validate = (s0: State) => (newAsyncState: Action<AsyncState<string>>): State => {                        // map output of async to output of any
    const result = newAsyncState(s0.AsyncState)
    if (result.kind == 'loaded' && s0.step === 'first') {
        if (!result.value) return ({
            ...s0,
            AsyncState: result,
            step: 'second'
        })
    } else if (result.kind == 'loaded' && s0.step === 'second') {
        if (!result.value) return ({
            loginEmail: "",
            loginPassword: "",
            AsyncState: result,
            step: 'login'
        })
    } else if (result.kind == 'loaded' && s0.step === 'login') {
        if (!result.value) return ({
            AsyncState: result,
            step: 'home'
        })
    }
    return ({ ...s0, AsyncState: newAsyncState(s0.AsyncState) })
}


export const app: IOWidget<State, State> = s0 => any<State>()([

    async<string>(                                      // makes io   
        error => hn(3, error)().never()
    )(s0.AsyncState)                                    // input
        .map((validate(s0))),

    s0.step === 'first' ?
        EmailForm(s0.emailData).map((emailData => ({ ...s0, emailData }))) :
        s0.step === 'second' ? AddressForm(s0.addressData).map((addressData => ({ ...s0, addressData }))) :
            s0.step === 'login' ? LoginForm(s0).map((loginData => ({ ...s0, loginEmail: loginData.loginEmail, loginPassword: loginData.loginPassword }))) :
                s0.step === 'home' ? hn(1, 'home')().never() :
                    nothing(),


    s0.step === 'first' ? button<State>('next')(() => {
        return ({ ...s0, AsyncState: loadingAsyncState(() => onNextPromise(s0.emailData)) })
    }) :
        s0.step === 'second' ? any<State>()([
            button<State>('submit')(() => {
                return ({ ...s0, loginEmail: "", loginPassword: "", AsyncState: loadingAsyncState(() => onSubmitPromise(s0.addressData)) })

            }),
            button<State>('back')(() => {
                return { ...s0, step: 'first' }
            })])
            :
            s0.step === 'login' ?
                button<State>('login')(() => {
                    return ({ ...s0, AsyncState: loadingAsyncState(() => logInPromise(s0.loginEmail, s0.loginPassword)) })


                }) : mkWidget({ run: _ => <Home values={s0} /> }),
])



export default app
