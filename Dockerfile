FROM richardkovacs/angular-unittest

COPY ./ /usr/src/app/

RUN yarn install && ng update
