import "./App.css";
import { useState } from "react";
import PolygonIDVerifier from "./PolygonIDVerifier";
import VcGatedContent from "./VcGatedContent";
import { Center, Card, Image, CardBody, Container } from "@chakra-ui/react";

function App() {
  const [provedAccessBirthday, setProvedAccessBirthday] = useState(false);
  return (
    <Center className="App">
      <Container>
        {provedAccessBirthday ? (
          <VcGatedContent />
        ) : (
          <Card
            style={{
              border: "2px solid #805AD5",
              background: "black",
              color: "white",
            }}
          >
            <CardBody style={{ paddingBottom: 0 }}>
              <p>
                This is a VC{" "}
                <a href="https://0xpolygonid.github.io/tutorials/#core-concepts-of-polygon-id-verifiable-credentials-identity-holder-issuer-and-verifier-triangle-of-trust">
                  (Verifiable Credential)
                </a>{" "}
                gated page.
              </p>
              <h2>Prove you were born before 2023 to mint NFT</h2>

              <PolygonIDVerifier
                // server code: https://github.com/oceans404/vc-verifier
                serverURL={process.env.REACT_APP_VERIFICATION_SERVER_URL}
                credentialType={"KYCAgeCredential"}
                issuerLink={
                  "https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4"
                }
                onVerificationResult={setProvedAccessBirthday}
              />
            </CardBody>
          </Card>
        )}
      </Container>
    </Center>
  );
}

export default App;
