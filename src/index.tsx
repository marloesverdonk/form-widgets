import * as React from "react"
import * as ReactDOM from 'react-dom'
import app from './app'
import { statefulRouter } from "./stateful_routing/stateful_routing"

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
      {statefulRouter.run(console.log)}
      {/* {app.run(console.log)} */}

    </div>)
  }
}

renderApp()