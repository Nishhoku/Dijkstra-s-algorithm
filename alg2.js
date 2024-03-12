const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Graph {
    constructor() {
        this.vertices = {};
    }

    addVertex(vertex) {
        this.vertices[vertex] = {};
    }

    addEdge(source, destination, weight) {
        this.vertices[source][destination] = weight;
    }

    dijkstra(start) {
        const distances = {};
        const visited = {};
        const pq = new PriorityQueue();

        for (let vertex in this.vertices) {
            distances[vertex] = Infinity;
            visited[vertex] = false;
        }

        distances[start] = 0;
        pq.enqueue(start, 0);

        while (!pq.isEmpty()) {
            const { element: currentVertex, priority: currentDistance } = pq.dequeue();

            if (visited[currentVertex]) continue;
            visited[currentVertex] = true;

            for (let neighbor in this.vertices[currentVertex]) {
                const distance = currentDistance + this.vertices[currentVertex][neighbor];
                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                    pq.enqueue(neighbor, distance);
                }
            }
        }

        return distances;
    }
}

class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.sortQueue();
    }

    dequeue() {
        if (!this.isEmpty()) {
            return this.queue.shift();
        }
        return null;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    sortQueue() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    dijkstra(start) {
        const distances = {};
        distances[start] = 0;
        return distances;
    }
}

const graph = new Graph();

rl.question('Введіть кількість вершин графа: ', (numVertices) => {
    for (let i = 1; i <= numVertices; i++) {
        graph.addVertex(String(i));
    }

    let count = 0;

    const addEdgeRecursive = () => {
        if (count < numVertices) {
            rl.question(`Введіть вершину призначення та вагу ребра (у форматі "vertex weight") для ребра ${count + 1}: `, (input) => {
                const [destination, weight] = input.split(' ');
                const source = String(count + 1);
                graph.addEdge(source, destination, parseInt(weight));
                count++;
                addEdgeRecursive();
            });
        } else {
            rl.question('Введіть вершину, з якої починається пошук: ', (startVertex) => {
                const shortestDistances = graph.dijkstra(startVertex);
                console.log('Найкоротші відстані від заданої вершини:');
                console.log(shortestDistances);
                rl.close();
            });
        }
    };

    addEdgeRecursive();
});
