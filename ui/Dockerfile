FROM node:8.15

ARG PACKAGE_PATH=
ARG WORKING_DIR=/src
ARG TYPES_PATH=

WORKDIR $WORKING_DIR
COPY $PACKAGE_PATH/package.json $WORKING_DIR/package.json
COPY $PACKAGE_PATH/package-lock.json $WORKING_DIR/package-lock.json
COPY $TYPES_PATH/index.d.ts $WORKING_DIR/dtc.d.ts
RUN npm install

COPY $PACKAGE_PATH $WORKING_DIR

VOLUME $WORKING_DIR/node_modules