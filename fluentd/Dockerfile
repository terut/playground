FROM fluent/fluentd:v0.14.11
MAINTAINER terut

USER root
RUN apk add --update --virtual .build-deps \
    sudo build-base ruby-dev \
 && fluent-gem install fluent-plugin-secure-forward --no-rdoc --no-ri \
 && apk del .build-deps \
 && rm -rf /var/cache/apk/* \
           /home/fluent/.gem/ruby/2.4.0/cache/*.gem
