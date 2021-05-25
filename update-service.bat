@ECHO OFF
ECHO Lets update the service!
docker build . -t sacation/letschess-front
docker push sacation/letschess-front