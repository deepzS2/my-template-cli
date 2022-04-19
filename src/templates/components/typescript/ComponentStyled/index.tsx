import React from 'react'

import { Container } from './styles'

<% if (useArrowFunction) { %>
interface Props {
  prop?: boolean
}  
<% } else { %>
interface Props {
  prop?: boolean
  children?: React.ReactNode
}
<% } %>


<% if (useArrowFunction) { %>
const <%= componentName %>: React.FC<Props> = () => {
    return (
      <Container>
        <h1>ComponentStyled</h1>
      </Container>
    )
  }
<% } else { %>
  function <%= componentName %>(props: Props) {
    return (
      <Container>
        <h1>ComponentStyled</h1>
      </Container>
    )
  }
<% } %>

export default <%= componentName %>
