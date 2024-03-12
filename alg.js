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
}

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
        const pq = new PriorityQueue();

        for (let vertex in this.vertices) {
            distances[vertex] = Infinity;
        }
        distances[start] = 0;
        pq.enqueue(start, 0);

        while (!pq.isEmpty()) {
            const { element: currentVertex, priority: currentDistance } = pq.dequeue();

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

// Приклад використання
const graph = new Graph();

// Додайте вершини та ребра до графа
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');

graph.addEdge('A', 'B', 1);
graph.addEdge('A', 'C', 4);
graph.addEdge('B', 'C', 2);
graph.addEdge('B', 'D', 5);
graph.addEdge('C', 'D', 1);

const startVertex = 'A';
const shortestDistances = graph.dijkstra(startVertex);

// Виведення результату
for (let vertex in shortestDistances) {
    console.log(`Shortest distance from ${startVertex} to ${vertex}: ${shortestDistances[vertex]}`);
}