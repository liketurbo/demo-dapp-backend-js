# demo-dapp-backend-js

This backend accompanies the [frontend example](https://github.com/liketurbo/demo-dapp-with-backend/tree/js-demo).

## Authorization Process

1. **Generate Payload**

   The client requests a payload to be signed by the wallet:

   ```json
   // <host>/ton-proof/generate-payload

   // Response
   {
     "payload": "E5B4ARS6CdOI2b5e1jz0jnS-x-a3DgfNXprrg_3pec0="
   }
   ```

2. **Connect to Wallet**

   The client connects to the wallet using TonConnect 2.0 and sends a `ton_proof` request with the payload. Details can be found in the [frontend SDK](https://github.com/ton-connect/sdk/tree/main/packages/sdk).

3. **User Approval**

   The user approves the connection, and the client receives the signed payload with additional prefixes.

4. **Verify Proof**

   The client sends the signed payload to the backend for verification. The backend checks the prefixes and signature, then returns an auth token:

   ```json
   // <host>/ton-proof/check-proof

   // Request
   {
     "address": "0:f63660ff947e5fe6ed4a8f729f1b24ef859497d0483aaa9d9ae48414297c4e1b", // User's address
     "network": "-239", // "-239" for mainnet and "-1" for testnet
     "proof": {
       "timestamp": 1668094767, // Unix epoch seconds
       "domain": {
         "lengthBytes": 21,
         "value": "ton-connect.github.io"
       },
       "signature": "28tWSg8RDB3P/iIYupySINq1o3F5xLodndzNFHOtdi16Z+MuII8LAPnHLT3E6WTB27//qY4psU5Rf5/aJaIIAA==",
       "payload": "E5B4ARS6CdOI2b5e1jz0jnS-x-a3DgfNXprrg_3pec0=", // Payload from step 1
       "state_init": "..."
     }
   }

   // Response
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMDpmNjM2NjBmZjk0N2U1ZmU2ZWQ0YThmNzI5ZjFiMjRlZjg1OTQ5N2QwNDgzYWFhOWQ5YWU0ODQxNDI5N2M0ZTFiIiwiZXhwIjoxNjY4MDk4NDkwfQ.13sg3Mgt2hT9_vChan3bmQkp_Wsigj9YjSoKABTsVGA"
   }
   ```

5. **Access Protected Endpoints**

   The client uses the auth token to access endpoints requiring authentication:

   ```json
   // <host>/dapp/get-account-info?network=-239
   // Bearer <token>

   // Response
   {
     "address": "0:f63660ff947e5fe6ed4a8f729f1b24ef859497d0483aaa9d9ae48414297c4e1b"
   }
   ```

For more details, see the [Signing and Verification](https://docs.ton.org/develop/dapps/ton-connect/sign) documentation.
