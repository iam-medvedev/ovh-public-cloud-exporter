# `ovh-public-cloud-exporter`

[Prometheus](https://prometheus.io/) exporter for [OVH Public Cloud](https://www.ovhcloud.com/en/public-cloud/) with S3 support.

## Getting Started

### Prerequisites

To use this exporter, you'll need to have an OVH account and API keys.

### Generating OVH API Keys

1. Log in to your [OVH API](https://api.ovh.com/).
2. Navigate to "New API Key" in the API console.
3. Fill in the required fields:
   - **Application Key**: This is your OVH application key.
   - **Application Secret**: This is your OVH application secret.
   - **Consumer Key**: This is your OVH consumer key.
   - **API Endpoint**: Choose the appropriate endpoint for your region (e.g., `ovh-eu` for Europe).
4. Save your API keys.

P.S. If you have registered in another region, see [this](https://github.com/ovh/node-ovh/?tab=readme-ov-file#1-create-an-application) for more information.

### Environment Variables

Set the following environment variables to configure the exporter:

| Environment Variable | Description                                | Default Value   |
| -------------------- | ------------------------------------------ | --------------- |
| `OVH_ENDPOINT`       | The endpoint for the OVH API               | -               |
| `OVH_APP_KEY`        | The application key for OVH API            | -               |
| `OVH_APP_SECRET`     | The application secret for OVH API         | -               |
| `OVH_CONSUMER_KEY`   | The consumer key for OVH API               | -               |
| `OVH_PROJECT_ID`     | The project ID for OVH                     | -               |
| `COLLECTOR_INTERVAL` | Interval for the collector in milliseconds | 600000 (10 min) |
| `HOSTNAME`           | The hostname or address to bind to         | 0.0.0.0         |
| `PORT`               | The port on which the service runs         | 9140            |
| `PATHNAME`           | The path where metrics are exposed         | /metrics        |

### Docker

To run the exporter using Docker use this command:

```sh
docker run -d \
    -e OVH_ENDPOINT=<your-ovh-endpoint> \
    -e OVH_APP_KEY=<your-ovh-app-key> \
    -e OVH_APP_SECRET=<your-ovh-app-secret> \
    -e OVH_CONSUMER_KEY=<your-ovh-consumer-key> \
    -e OVH_PROJECT_ID=<your-ovh-project-id> \
    -e COLLECTOR_INTERVAL=600000 \
    -e PORT=9140 \
    -e HOSTNAME=0.0.0.0 \
    -e PATHNAME=/metrics \
    -p 9140:9140 \
    ghcr.io/iam-medvedev/ovh-public-cloud-exporter:latest
```

After running the container, the metrics will be available at http://localhost:9140/metrics.

### Docker Compose

You can also use Docker Compose to manage the exporter. Create a `docker-compose.yml` file with the following content:

```yaml
version: "3"

services:
  ovh-public-cloud-exporter:
    image: ghcr.io/iam-medvedev/ovh-public-cloud-exporter:latest
    environment:
      - OVH_ENDPOINT=ovh-eu
      - OVH_APP_KEY=your_app_key
      - OVH_APP_SECRET=your_app_secret
      - OVH_CONSUMER_KEY=your_consumer_key
      - OVH_PROJECT_ID=your_project_id
      - COLLECTOR_INTERVAL=600000
      - PORT=9140
      - HOSTNAME=0.0.0.0
      - PATHNAME=/metrics
    ports:
      - "9140:9140"
```
