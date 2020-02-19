import { string, stateful, any, div, label, mk_widget, Action, hn, button, AsyncState, unloadedAsyncState, mkWidget, IOWidget, checkbox, Widget, nothing } from "widgets-for-react"
import { LoginEmail } from "../app"

      const LoginForm: IOWidget<LoginEmail, LoginEmail> = (s0:LoginEmail) => any<LoginEmail>()([
      string({id:'loginEmail'})(s0.loginEmail).map(loginEmail => ({ ...s0, loginEmail })),
      string({id:'loginPassword'})(s0.loginPassword).map(loginPassword => ({ ...s0, loginPassword })),
      hn(1, 'login')().never(),
    ])

export default LoginForm