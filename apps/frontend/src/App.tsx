import {
  FusionAuthLoginButton,
  FusionAuthLogoutButton,
  FusionAuthRegisterButton,
  useFusionAuth,
} from "@fusionauth/react-sdk";
import "./App.css";

function App() {
  const { isAuthenticated, isLoading, user } = useFusionAuth();

  return (
    <div>
      <pre>{JSON.stringify({ isAuthenticated, isLoading, user })}</pre>
      {isAuthenticated ? (
        <FusionAuthLogoutButton />
      ) : (
        <>
          <FusionAuthLoginButton />
          <FusionAuthRegisterButton />
        </>
      )}
    </div>
  );
}

export default App;
