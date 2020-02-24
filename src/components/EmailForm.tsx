import { string, stateful, any, div, label, mk_widget, Action, hn, button, AsyncState, unloadedAsyncState, mkWidget, IOWidget, checkbox, Widget, nothing } from "widgets-for-react"
import {Email} from '../app'

 const EmailForm: IOWidget<Email, Email> = (s0:Email) => any<Email>()([
    hn(1, 'Sign up')().never(),

    hn(4, 'Email')().never(),
    string({id:'email', type: 'email'})(s0.email).map(email => ({ ...s0, email })),

    hn(4, 'Password')().never(),
    string({id:'password', type: s0.showPassword ? 'text' : 'password'})(s0.password).map(password => ({ ...s0, password })),

    hn(4, 'Confirm password')().never(),
    string({id:'confirmPassword', type: s0.showPassword ? 'text' : 'password'})(s0.confirmPassword).map(confirmPassword => ({ ...s0, confirmPassword })),

    hn(6, 'Show password')().never(),
    checkbox<boolean>({ selected_value:true, unselected_value:false, id:'showPassword'})(s0.showPassword).map(showPassword => ({ ...s0, showPassword})),
  ])

  export default EmailForm