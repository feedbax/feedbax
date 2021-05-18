FROM node:14.15.3-buster

RUN apt-get install -y git
RUN yarn global add pnpm@6.3.0

COPY ./.devcontainer/extensions/terminals /root/.vscode-server/extensions/terminals
COPY ./.devcontainer/extensions/terminals /root/.vscode-remote/extensions/terminals
COPY ./.devcontainer/extensions/terminals /root/.vscode/extensions/terminals

COPY ./.devcontainer/scripts/post-create.sh /scripts/post-create.sh
RUN chmod +x /scripts/post-create.sh
