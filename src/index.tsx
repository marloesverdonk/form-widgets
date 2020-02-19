import * as React from "react"
import * as ReactDOM from 'react-dom'
import app from './app'

function renderApp() {

  ReactDOM.render(
    <Main />,
    document.getElementById('example')
  )
}

document.addEventListener("DOMContentLoaded", e => renderApp())


class Main extends React.Component<{}, {}> {
  render() {
    return (<div>
      {app.run(console.log)}
  
      {/* {LoginForm.run(console.log)} */}
      
    </div>)
  }
}

renderApp()