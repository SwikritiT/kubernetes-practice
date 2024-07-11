## List of commands that might come in handy

```bash
kubectl port-forward <pod> <host-port>:<container-pod>
kubectl logs <pod> --tail=10
kubectl logs <pod> --since=2m
kubectl logs <pod> --since-time=2020-02-01T09:50:00Z
kubectl logs <pod> --timestamps=true
kubectl cp <pod>:html/index.html /tmp/index.html # Copying files to and from containers
kubectl cp /tmp/index.html <pod>:html/
kubectl exec <pod> -- ps aux # Invoking a single command in the container
kubectl exec -it <pod> -- bash # Running an interactive shell in the container
kubectl attach <pod> # attach to a running container
kubectl delete po <pod-name> # delete a single pod
kubectl delete po <pod-1> <pod-2> <pod-3> # delete multiple pod
kubectl delete -f <manifest-file>.yaml # Deleting objects by specifying the manifest file
kubectl delete -f <manifest-file>.yaml,<manifest-file>.yaml # Deleting multiple objects by specifying the manifest file
kubectl delete po --all # delete all the pods
kubectl delete all --all # delete everything pods, services, deployments except event obj
kubectl delete events,all --all
kubectl apply -f manifests/ # deploy all the manifests
```
