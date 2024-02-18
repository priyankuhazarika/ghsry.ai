# FusionAuth (development)

Spin up a complete instance of FusionAuth using Docker Compose. [Install Docker](https://docs.docker.com/get-docker/)

```bash
docker compose up -d
```

Check logs

```bash
docker compose logs -f
```

To stop FusionAuth

```
docker compose stop
```

Later, it can be started with

```bash
docker compose start
```

Access FusionAuth at [http://localhost:9011](http://localhost:9011).

## MailCatcher

It also comes with [MailCatcher](https://mailcatcher.me/) installed, so any mails sent by FusionAuth will be visible at [http://localhost:1080](http://localhost:1080)
