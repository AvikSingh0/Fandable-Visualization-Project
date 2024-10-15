# Gitlab Agent Registration Token

Token: 2k4iofqM9HtENb5zpJ9YRYCbsvaAUVTCYuxCBHwXoRpDACo8zQ

Docker command:

```
docker run --pull=always --rm \
registry.gitlab.com/gitlab-org/cluster-integration/gitlab-agent/cli:v14.8.1 generate \
--agent-token=2k4iofqM9HtENb5zpJ9YRYCbsvaAUVTCYuxCBHwXoRpDACo8zQ \
--kas-address=wss://gitlab.socs.uoguelph.ca/-/kubernetes-agent/ \
--agent-version v14.8.1 \
--namespace gitlab-agent | rancher kubectl apply -f -
```

# Gitlab Registry Deploy Token

## Change docker-username, docker-password, docker-email, namespace

username: fandableagent
token: sfoy7wMjctQoM-7bDg_u
namespace: fandable
dockeremail: brycen@uoguelph.ca

rancher context switch
rancher kubectl create namespace fandable-staging

rancher kubectl create secret docker-registry regcred --namespace=fandable-staging --docker-server=registry.socs.uoguelph.ca --docker-username=fandableagent --docker-password=sfoy7wMjctQoM-7bDg_u --docker-email=brycen@uoguelph.ca
