<% if (useSteps) { %> import { StateMachineProvider } from 'little-state-machine' <% } %>
import { ToastContainer } from 'react-toastify'

<% if (useQuery) { %> import { QueryClientProvider } from './query' <% } %>
import ThemeContext from './theme'

<% if (useSteps) { %> import '@/store' <% } %>
import 'react-toastify/dist/ReactToastify.css'

const ContextsProviders: React.FC = ({ children }) => {
  return (
    <>
      <ToastContainer />
<% if (useQuery) { %>
      <QueryClientProvider>
<% } %>
<% if (useSteps) { %> 
        <StateMachineProvider>
          <ThemeContext>{children}</ThemeContext>
        </StateMachineProvider>
<% } else { %>
			  <ThemeContext>{children}</ThemeContext>
<% } %>
<% if (useQuery) { %>
      </QueryClientProvider>
<% } %>
    </>
  )
}

export default ContextsProviders
