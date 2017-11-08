# ping

Sometimes we need nothing more than a notification that something has happened.

Ping is a service to make it easier to subscribe to simple push notifications--or "pings"--from feeds you subscribe to. Ping centralizes all mobile push notification feeds into a single application and makes receiving notifications as easy as subscribing to a feed. Users can create their own feeds for DIY projects or for organization-wide messages for anyone to subscribe to.

## How it works

Services send a `HTTP POST` request to Ping's webhook, which interprets the results and braodcasts the message to all subscribing users. The Ping app continuously listens for pings on its feeds and alerts the user in the form of a push notification.
