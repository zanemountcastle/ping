# ping

Sometimes we need nothing more than a notification that something has happened.

Ping is a service to make it easier to subscribe to simple push notifications--or "pings"--from feeds you subscribe to. Ping centralizes all mobile push notification feeds into a single application and makes receiving notifications as easy as subscribing to a feed. Users can create their own feeds for DIY projects or for organization-wide messages for anyone to subscribe to.

## How it works

Services send a `HTTP POST` request to Ping's webhook, which interprets the results and braodcasts the message to all subscribing users. The Ping app continuously listens for pings on its feeds and alerts the user in the form of a push notification.


## User Stories and Use Cases

1. As a user, I want to receive notifications when there is free food, events, or available resources on campus.
	1. The user should be able to receive a push notification in his/her device.
	2. The notification should have a title and a short description.

2. As a user, I want to subscribe/unsubscribe to specific feeds.
	1. The user should be able to see a list of feeds in a main screen that they can click to subscribe to.
	2. The user should be able to click a button and unsubscribe from that feed.

3. As a notifier, I want to be able to write a notification and send it.
	1. The notifier should be able to write a notification in a text box.
	2. The notifier should be able to press a button to send the notification.

4. As a developer, I want to be able to create a feed.
	1. There will be complete documentation for how to create a webhook and corresponding feed
	2. The developer should be able to post the feed into the app once it’s developed.
