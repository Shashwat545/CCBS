/**
 * @file Contollers for authentication. Session-based using OAuth 2.0
 */
const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

function getOAuth2Client() {
  return new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI);
}

async function oAuthRedirect(req, res, next) {
  if (req.session.credentials) {
    // If session is already logged in, do not redirect to OAuth consent screen.
    res.status(200).send({ error: "Already logged in" });
  } else {
    try {
      const oAuth2Client = getOAuth2Client();

      // Generate code challenge & verifier (PKCE)
      const { codeChallenge, codeVerifier } =
        await oAuth2Client.generateCodeVerifierAsync();
      // Store the code verifier in the session
      req.session.codeVerifier = codeVerifier;

      // Generate auth URL
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        scope: [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
          "openid",
        ],
      });

      // Redirect user to the generated auth URL
      res.redirect(authUrl);
    } catch (err) {
      next(err);
    }
  }
}

async function googleLogin(req, res, next) {
  const oAuth2Client = getOAuth2Client();

  // Get authorization code from request and code verifier from session storage
  const code = req.body.code;
  const codeVerifier = req.session.codeVerifier;

  if (!req.session.credentials) {
    try {
      // Request for an access token.
      const { tokens } = await oAuth2Client.getToken({ code, codeVerifier });

      // TODO: add an entry in the User model with the current credentials, if
      //       the current user is not already in the database.

      // Storing credentials in session storage
      req.session.credentials = tokens;
    } catch (err) {
      // If authorization code was invalid, we return 401 Unauthorized.
      next(createError(401, "Invalid code grant request"));
    }
  }
  res.sendStatus(201);
}

async function logout(req, res, next) {
  try {
    if (req.session.credentials) {
      // If session was logged in, then revoke credentials
      const oAuth2Client = getOAuth2Client();
      oAuth2Client.setCredentials(req.session.credentials);
      await oAuth2Client.revokeCredentials();
    }
  } catch (err) {
    next(err);
  }

  // Destroy the current session
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.sendStatus(204);
    }
  });
}

module.exports = {
  oAuthRedirect,
  googleLogin,
  logout,
};
