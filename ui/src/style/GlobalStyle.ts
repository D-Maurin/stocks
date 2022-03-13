import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  :root{
    --primary: #a61413;
    --secondary: #ec9c9c;
    --light: #fff3e9;
  }

  body {
    background-color: var(--light);
  }

  *{
    box-sizing: border-box;
  }
`

export default GlobalStyle
