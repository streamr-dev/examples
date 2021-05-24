FROM debian:buster AS builder
#RUN echo build app

FROM debian:buster-slim
RUN apt-get update && apt-get --assume-yes --no-install-recommends install \
netcat
#COPY --from=builder /build/file /bin/target
HEALTHCHECK --interval=10s --timeout=10s --start-period=10s --retries=60 CMD nc -v -z localhost 80

