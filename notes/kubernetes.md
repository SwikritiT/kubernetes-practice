## introduction

1. [kubernnetes illustrated for childrens](https://youtu.be/Q4W8Z-D-gcQ)
2. `Kubernetes` uses labels as "nametags" to dientyfy things and it can query based on these labels
3. Kubernetes is a `self-healing"` system - usually, you (the maintainer or the developer) don't have to do anything in case something goes wrong with a pod or a container.

## Pods

1. A runable unit of work
2. usually run a single container inside a pod but in cases where the containers are tightly coupled , more than one container can be run inside a same pod
3. K8s takes on the task to connect a pod to external network and rest of the environment of the K8s
4. it is deleted if the containers within stop running and contained files will be lost with it.

## Replecation Controllers

1. responsible for creating a method to manage any arbitary number of pods
2. contains a pod template that can be replicated any number of times
3. through replication controllers k8s will manage the entire lifecycle of pod including scaling up and down, rolling deployments and monitoring.

## Service

1. A service tells rest of k8s env including other pods and replication env what services your app provides
2. the pods may come and go but the ip addresses and ports of the service remains persistent
3. other app can find servies through the k8s service discovery
4. Service resources will take care of serving the application to connections from outside (and also inside!) of the cluster.

## Volume

1. providers expose both ephemeral and persistent storages: EBS, Ceph, Gluster
2. for container to store and access other information
3. pods can mount volumes like files systems

## Namespace

1. grouping mechanism inside the k8S
2. services, volumes, pods can easily collaborate within a namespace
3. but namespace provides a degree of isolation from other parts of the cluster

## cluster

1. a group of machines i.e nodes that work together
2. can be of any size
3. a single node cluster would consist of one machine that hosts the k8s control panel(exposing API and maintaining the cluster)
4. that cluster can then be expanded upto 5000 nodes total, as of Kubernetes v1.18.
   ![K8s cluster](cluster.png)

## Kubectl

- Kubectl is the Kubernetes command-line tool and will allow us to interact with the cluster.
- kubectl sill read the config from location in env var `KUBECONFIG` or default location `~/.kube/config` and use the info to connect to the cluster

## Deployment

- to deploy an application, we need to create a deployment object with the image.

## NodePort

- NodePorts are simply ports that are opened by Kubernetes to all of the nodes and the service will handle requests in that port.
- NodePorts are not flexible and require you to assign a different port for every application
- NodePorts are not used in production but are helpful to know about.

## Commands

[link to kubernetes command pages](https://kubernetes.io/docs/reference/kubectl/docker-cli-to-kubectl/)

```bash
kubectl explain RESOURCE i.e. pod # find information about the different resources Kubernetes has
kubectl get RESOURCE i.e. pods # list all objects of a resource
```

## Actions when we deploy an app

These actions take place when you deploy the application:

1. You submit the application manifest to the Kubernetes API. The API
   Server writes the objects defined in the manifest to etcd.
2. A controller notices the newly created objects and creates several new
   objects - one for each application instance.
3. The Scheduler assigns a node to each instance.
4. The Kubelet notices that an instance is assigned to the Kubelet’s node. It
   runs the application instance via the Container Runtime.
5. The Kube Proxy notices that the application instances are ready to
   accept connections from clients and configures a load balancer for them.
6. The Kubelets and the Controllers monitor the system and keep the
   applications running.

## managed Kubernetes offerings

The top managed Kubernetes offerings include the following:
Google Kubernetes Engine (GKE)

1. Azure Kubernetes Service (AKS)
2. Amazon Elastic Kubernetes Service (EKS)
3. IBM Cloud Kubernetes Service
4. Red Hat OpenShift Online and Dedicated
5. VMware Cloud PKS
6. Alibaba Cloud Container Service for Kubernetes (ACK)

## Main parts in an object

The manifest of most Kubernetes API objects consists of the following four
sections:

1. Type metadata: describes about the type of the object, the group it belongs to and the api version
2. Object metadata: contains basic info about the object instance, like name, time of creation, owner, and other identifying information. The fields in this metadata are same of all object types.
3. Spec: explains the desired state of the obj. this is seperate for each object type.for pods: pod's containers, storage,volumes and other info related to the pod
4. status: current actual state of the object. for pod: condition of the pod, status of each container, its ip, node it's running on and other info about what's happening in the pod
   > Note: the controller is the thing that reads the Spec and writes the Status of the object.

![K8s api object](kube-api.png)

## The Type Metadata fields

1. The manifest starts with the apiVersion and kind fields,
   which specify the API version and type of the object that this object manifest
   specifies
2. For Deployment objects, for example, the apiVersion is
   apps/v1.
3. The type of object defined in the manifest is specified by the field kind i.e. Deployment, Service, Pod, Node

## Fields in the Object Metadata section

1. The metadata section contains the metadata of this object instance
2. It contains the name of the instance, along with additional attributes such as labels and annotations

## Fields in the Spec section

1. podCIDR fields specify the pod IP range assigned to the node

## Fields in the Status section

1. it contains the last observed state of the thing the object represents
2. For Node objects, the status reveals the node’s IP address(es), host name, capacity to provide compute resources, the current conditions of the node, the container images it has already downloaded and which are now cached locally, and information about its operating system and the version of Kubernetes components running on it.

## Understanding an object’s status conditions

```console
k get nodes k3d-k3s-default-server-0 -o json | jq .status.conditions
```

```json
[
	{
		"lastHeartbeatTime": "2024-07-09T10:44:14Z",
		"lastTransitionTime": "2024-07-09T07:05:36Z",
		"message": "kubelet has sufficient memory available",
		"reason": "KubeletHasSufficientMemory",
		"status": "False",
		"type": "MemoryPressure"
	},
	{
		"lastHeartbeatTime": "2024-07-09T10:44:14Z",
		"lastTransitionTime": "2024-07-09T07:05:36Z",
		"message": "kubelet has no disk pressure",
		"reason": "KubeletHasNoDiskPressure",
		"status": "False",
		"type": "DiskPressure"
	},
	{
		"lastHeartbeatTime": "2024-07-09T10:44:14Z",
		"lastTransitionTime": "2024-07-09T07:05:36Z",
		"message": "kubelet has sufficient PID available",
		"reason": "KubeletHasSufficientPID",
		"status": "False",
		"type": "PIDPressure"
	},
	{
		"lastHeartbeatTime": "2024-07-09T10:44:14Z",
		"lastTransitionTime": "2024-07-09T07:05:36Z",
		"message": "kubelet is posting ready status",
		"reason": "KubeletReady",
		"status": "True",
		"type": "Ready"
	}
]
```

1. The lastTransitionTime field indicates when the condition
   moved from one status to another, whereas the lastHeartbeatTime field
   reveals the last time the controller received an update on the given condition
2. the Ready condition signals whether the node is ready to accept new
   workloads (pods)
3. The other conditions (MemoryPressure, DiskPressure and PIDPressure) signal whether the node is running out of resources

![object status conditions](status-conditions.png)

## Observing cluster events via Event objects

1. Two types of events exist: Normal and Warning.
2. Events of the latter type are usually generated by controllers when something prevents them from reconciling the object
3. Events are represented by Event objects that are created and read via the Kubernetes API
4. Unlike other objects, each Event object is deleted one hour after its creation to reduce the burden on etcd, the data store for Kubernetes API objects.

```bash
kubectl get ev --field-selector type=Warning
```

![Events](events.png)
