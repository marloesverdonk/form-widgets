import { string, stateful, any, div, label, mk_widget, Action, hn, button, AsyncState, unloadedAsyncState, mkWidget, IOWidget, checkbox, Widget, nothing } from "widgets-for-react"
import {Address} from '../app'
import React = require("react")

const dropdown: IOWidget<string, string> = (s0) => mkWidget({
    run: callback => (
        <select value={s0} onChange={e => callback(e.currentTarget.value)}>
            <option value={'Den Haag'}>Den Haag</option>
            <option value={'Rotterdam'}>Rotterdam</option>
            <option value={'Amsterdam'}>Amsterdam</option>
        </select>
    )
}) 

const postalCode: IOWidget<string, string> =  string({id:'postalCode'})

const AddressForm: IOWidget<Address, Address> = (s0:Address) => any<Address>()([
    hn(1, 'Sign up')().never(),

    hn(4, 'Street')().never(),
    string({id:'street'})(s0.street).map(street => ({ ...s0, street })),

    hn(4, 'Number')().never(),
    string({id:'number'})(s0.number).map(number => ({ ...s0, number })),

    hn(4, 'Postal code')().never(),
    //string(({id:'postalCode'})(s0.postalCode).map(postalCode => ({ ...s0, postalCode })),
    postalCode(s0.postalCode).map(postalCode => ({...s0, postalCode})),

    hn(4, 'City')().never(),
    // string({id:'city'})(s0.city).map(city => ({ ...s0, city })),
    div<Address>()(dropdown(s0.city).map(city => ({ ...s0, city}))),

    

    hn(6, 'Terms accepted')().never(),
    checkbox<boolean>({ selected_value:true, unselected_value:false, id:'termsAccepted'})(s0.termsAccepted).map(termsAccepted => ({ ...s0, termsAccepted})),

   
  ])

  export default AddressForm