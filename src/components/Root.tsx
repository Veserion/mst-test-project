import * as React from "react"

import { StoreProvider } from "../common/StoreProvider"
import { App } from "./App"

const Root: React.FC = () => <StoreProvider>
    <App />
  </StoreProvider>


export default Root
