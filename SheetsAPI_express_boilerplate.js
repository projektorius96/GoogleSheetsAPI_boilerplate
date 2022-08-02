// TIP : refer to README.md for more in detail

const sheetsAPI = require("@googleapis/sheets");
const path = require("path");
const express = require("express");
const morganBody = require("morgan-body")

// EXPRESS MINIMUM BOILERPLATE :
const app = express(); // # as if require('http').createServer(app) to get raw HTTP if WebSocket (ws, socket.io) would be required
const port = 8989; // TIP : check if port available on git bash for windows command is : netstat -an | grep ':<PORT>' # without angle brackets ,..
// .., state [LISTENING] means it is free to use

//This allows us to parse the incoming request body as JSON
app.use(express.json());

// With this, we'll listen for the server on port 8989
app.listen(port, () => console.log(`Listening on port ${port}`));

async function main() {
  const auth = new sheetsAPI.auth.GoogleAuth({ /* as if AuthPlus.GoogleAuth({}) */
    // Secrets keys are issued at Service Account -> Keys section on GCC dashboard
    keyFilename: path.join(__dirname, "SECRETS_FILE_NAME.json"), /* considering secrets are same direction as this codebase */
    // TIP : Scopes can be specified either as an array or as a single, space-delimited string
    // List of all scopes for each GCP service API : @https://developers.google.com/identity/protocols/oauth2/scopes
    scopes: [/* scopes to match against the ones set on IAM intially via Google managed user-account */
    "https://www.googleapis.com/auth/spreadsheets"
    ],
/*//Other options (ref) : 
    checkIsGCE: undefined,
    jsonContent: null,
    cachedCredential: null,
    _cachedProjectId: null,
    clientOptions: undefined,
    JWT: [class JWT extends OAuth2Client],
    Compute: [class Compute extends OAuth2Client],
    OAuth2: [class OAuth2Client extends AuthClient] {
    GOOGLE_TOKEN_INFO_URL: 'https://oauth2.googleapis.com/tokeninfo',
    GOOGLE_OAUTH2_AUTH_BASE_URL_: 'https://accounts.google.com/o/oauth2/v2/auth',
    GOOGLE_OAUTH2_TOKEN_URL_: 'https://oauth2.googleapis.com/token',
    GOOGLE_OAUTH2_REVOKE_URL_: 'https://oauth2.googleapis.com/revoke',
    GOOGLE_OAUTH2_FEDERATED_SIGNON_PEM_CERTS_URL_: 'https://www.googleapis.com/oauth2/v1/certs',
    GOOGLE_OAUTH2_FEDERATED_SIGNON_JWK_CERTS_URL_: 'https://www.googleapis.com/oauth2/v3/certs',
    GOOGLE_OAUTH2_IAP_PUBLIC_KEY_URL_: 'https://www.gstatic.com/iap/verify/public_key',
    CLOCK_SKEW_SECS_: 300,
    MAX_TOKEN_LIFETIME_SECS_: 86400,
    ISSUERS_: [ 'accounts.google.com', 'https://accounts.google.com' ]
    },
    GoogleAuth: [class GoogleAuth] {
    DefaultTransporter: [class DefaultTransporter] {
    USER_AGENT: 'google-api-nodejs-client/7.11.0'
    }
    },
    AwsClient: [class AwsClient extends BaseExternalAccountClient],
    IdentityPoolClient: [class IdentityPoolClient extends BaseExternalAccountClient],
    ExternalAccountClient: [class ExternalAccountClient]
    */
  });

  // Create client instance for auth
  const authClient = await auth.getClient();

  // Instance of the Sheets API as sheetsAPI
  const sheets = /* await  */sheetsAPI.sheets({ version: "v4", auth: authClient });

  /* console.log(sheets); */ return sheets;

}
// main().catch(e => {
//   console.error(e);
//   throw e;
// });

app.get("/", async (req, res) => {
  try{
    const sheetsObject = await main();
    const getRows = await sheetsObject.spreadsheets.values.get({
      spreadsheetId: "1LpGg4sBa_lXK6_XKRnPEx4wVUFK1Np3DoMfR0e9a9QQ", /* NOTE : MUST SHARE TO PROVIDE THE SHEETS ID  */
      range: "Sheet1", /* A1 notation : it says "all ranges" */
    });

    // TO USER-AGENT WINDOW [LINE BELOW IS OPTIONAL]
    // res.send(getRows.data)

    // Idiomatic equivalent for res.json(), if such used :
    // if (res.set({'Content-Type': 'application/json'})) {
    //     res.send(getRows.data);
    // }
  
    // REDIRECT TO TERMINAL
    morganBody(app, {
      stream: process.stdout
    })
    console.log(getRows.data.values)
  
  }
  catch(e){
    new Error(e) // if minimum stack trace not needed , just throw e;
  }

}); 
