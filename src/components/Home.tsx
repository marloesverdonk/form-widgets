import * as React from "react"
import { State } from '../app'

interface Props {
    values: State
}

const Home: React.FC<Props> = (props: Props) => {
    return (
        <div>
            <h1>Homepage</h1>
        </div>)
}

export default Home


