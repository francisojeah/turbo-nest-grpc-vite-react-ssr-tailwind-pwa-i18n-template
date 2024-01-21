import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./components/Home";
import Users from "./components/Users";
import { ThemeProvider } from "@/components/theme-provider"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

type Props = {
  assetMap?: {
    'styles.css': string,
    'main.js': string,
    'manifest'?: string,
    'vite-plugin-pwa:register-sw'?: string,
    'additional-styles': string[],
    'additional-jss': string[],
    initialContentMap: {
      'title': string,
      'description'?: string,
      'hello-message'?: string,
    },
    baseUrl: string,
    initialI18nStore?: {},//to be used with the middleware
    initialLanguage?: string,
    clientFirstAcceptLanguage?: string

  },

}

//create a context to be used to pass app props down the component hierarcy, as the need arises.
// export const AppContext = createContext<AppContextType>(null);

const App: React.FC<Props> = ({ assetMap }) => {

  const baseUrl = "/";
  //create a react query client at the top
  // Create a client
  const queryClient = new QueryClient()

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path={`${baseUrl}`} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="view-users" element={<Users />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
