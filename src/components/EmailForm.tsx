import { string, stateful, any, div, label, mk_widget, Action, hn, button, AsyncState, unloadedAsyncState, mkWidget, IOWidget, checkbox, Widget, nothing } from "widgets-for-react"
import {Email} from '../app'

 const EmailForm: IOWidget<Email, Email> = (s0:Email) => any<Email>()([
    string({id:'email'})(s0.email).map(email => ({ ...s0, email })),
    string({id:'password'})(s0.password).map(password => ({ ...s0, password })),
    string({id:'confirmPassword'})(s0.confirmPassword).map(confirmPassword => ({ ...s0, confirmPassword })),
    checkbox<boolean>({ selected_value:true, unselected_value:false, id:'showPassword'})(s0.showPassword).map(showPassword => ({ ...s0, showPassword})),
  ])

  export default EmailForm