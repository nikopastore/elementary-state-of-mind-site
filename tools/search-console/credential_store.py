"""Optional local authorization shared with the user's private stdio MCP server."""
import json
import keyring
from google.oauth2.credentials import Credentials

SERVICE = "ESOM Search Console"
ACCOUNT = "read-only-google"


def save(credentials):
    if not credentials.refresh_token:
        raise ValueError("Google did not return an offline grant. Reconnect Google to enable assistant access.")
    keyring.set_password(SERVICE, ACCOUNT, credentials.to_json())


def load():
    stored = keyring.get_password(SERVICE, ACCOUNT)
    if not stored:
        raise ValueError("Connect Google in the ESOM dashboard and choose Enable local assistant access.")
    return Credentials.from_authorized_user_info(json.loads(stored))


def forget():
    if keyring.get_password(SERVICE, ACCOUNT):
        keyring.delete_password(SERVICE, ACCOUNT)
