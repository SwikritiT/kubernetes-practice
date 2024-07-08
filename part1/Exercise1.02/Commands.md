## Commands run while deployment and their output

```bash
$ kubectl create deployment todo --image=swikrititripathi/todo:v0.1
```

```bash
$ kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
todo-8479976f5b-lr99k   1/1     Running   0          3m26s
```

```bash
$ kubectl get deployments
NAME   READY   UP-TO-DATE   AVAILABLE   AGE
todo   1/1     1            1           3m52s

```

```bash
$ kubectl logs -f todo-8479976f5b-lr99k
Server started in port 3000

```
