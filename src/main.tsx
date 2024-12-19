import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter } from "react-router-dom";
import { UserDataProvider } from "./context/UserDataProvider.tsx";
import { PokemonDataProvider } from "./context/PokemonDataProvider.tsx";
import { DuelDataProvider } from "./context/duel-data-provider/DuelDataProvider.tsx";
import { BagDataProvider } from "./context/bag-data-provider/BagDataProvider.tsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <QueryClientProvider client={queryClient}>
      <UserDataProvider>
        <PokemonDataProvider>
          <DuelDataProvider>
            <BagDataProvider>
              <App />
            </BagDataProvider>
          </DuelDataProvider>
        </PokemonDataProvider>
      </UserDataProvider>
    </QueryClientProvider>
  </HashRouter>
);
