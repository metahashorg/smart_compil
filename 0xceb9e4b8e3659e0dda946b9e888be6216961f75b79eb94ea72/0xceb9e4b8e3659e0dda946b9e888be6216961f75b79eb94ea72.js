function getData() {
      return fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json());
}
    
function logData() {
  getData().then((data) => {
  console.log(JSON.stringify(data, '', 4));
})
}