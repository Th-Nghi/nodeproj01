# [Choice] Node.js version: 22-bookworm, 22-bullseye, 20-bookworm, 20-bullseye, 18-bookworm, 18-bullseye
FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bullseye

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends software-properties-common

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends software-properties-common \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts
