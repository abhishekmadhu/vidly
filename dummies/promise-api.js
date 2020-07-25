// Preresolved promises, used for tests. 
const p = Promise.resolve({ id: 1 });
p.then(prom => console.log(prom));

const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('In Async operation 1');
        resolve(1);
    }, 3000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('In Async operation 2');
        resolve(2);
    }, 3000);
});

Promise.all([p1, p2])
    .then(result => console.log(result));
