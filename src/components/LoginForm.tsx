import { string, stateful, any, div, label, mk_widget, Action, hn, button, AsyncState, unloadedAsyncState, mkWidget, IOWidget, checkbox, Widget, nothing } from "widgets-for-react"
import { LoginEmail } from "../app"

const LoginForm: IOWidget<LoginEmail, LoginEmail> = (s0: LoginEmail) => any<LoginEmail>()([
    hn(1, 'login')().never(),

    hn(4, 'Email')().never(),
    string({ id: 'loginEmail' })(s0.loginEmail).map(loginEmail => ({ ...s0, loginEmail })),

    hn(4, 'Password')().never(),
    string({ id: 'loginPassword', type:'password' })(s0.loginPassword).map(loginPassword => ({ ...s0, loginPassword })),
])

export default LoginForm