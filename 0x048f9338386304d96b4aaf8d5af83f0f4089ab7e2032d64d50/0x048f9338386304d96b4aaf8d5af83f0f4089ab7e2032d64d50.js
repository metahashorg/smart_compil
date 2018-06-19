function getData() {
      return fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json());
}
    
async function logData() {
  let data = await getData()
  console.log(JSON.stringify(data, '', 4));
}