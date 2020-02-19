import { string, stateful, any, div, label, mk_widget, Action, hn, button, AsyncState, unloadedAsyncState, mkWidget, IOWidget, checkbox, Widget, nothing } from "widgets-for-react"
import {Address} from '../app'

const AddressForm: IOWidget<Address, Address> = (s0:Address) => any<Address>()([
    string({id:'street'})(s0.street).map(street => ({ ...s0, street })),
    string({id:'number'})(s0.number).map(number => ({ ...s0, number })),
    string({id:'postalCode'})(s0.postalCode).map(postalCode => ({ ...s0, postalCode })),
    string({id:'city'})(s0.city).map(city => ({ ...s0, city })),
    checkbox<boolean>({ selected_value:true, unselected_value:false, id:'termsAccepted'})(s0.termsAccepted).map(termsAccepted => ({ ...s0, termsAccepted})),
  ])

  export default AddressForm