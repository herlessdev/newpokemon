import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter } from "react-router-dom";
import { UserDataProvider } from "./context/UserDataProvider.tsx";
import { PokemonDataProvider } from "./context/PokemonDataProvider.tsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <QueryClientProvider client={queryClient}>
      <UserDataProvider>
        <PokemonDataProvider>
          <App />
        </PokemonDataProvider>
      </UserDataProvider>
    </QueryClientProvider>
  </HashRouter>
);
