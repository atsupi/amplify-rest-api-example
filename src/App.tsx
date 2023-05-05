import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { Authenticator, Button } from "@aws-amplify/ui-react";
import { RideList } from "./RideList";

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <p>{user?.username}</p>
          <Button onClick={signOut}>Sign Out</Button>
          <RideList username={user?.username || "UNAUTH"} />
        </>
      )}
    </Authenticator>
  );
}

export default App;
