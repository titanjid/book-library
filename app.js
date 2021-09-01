
const container= document.getElementById('divContainer');

document.getElementById('search-btn').addEventListener('click',function(){
    const searchField=document.getElementById('search-field')
    const searchText=searchField.value;
    const url=`http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.docs.length == 0||data.docs==undefined){
            console.log('No data found');
        }
        else{
            dispalyBook(data.docs)
        }
    })
})
function dispalyBook(bookArray){
   
    bookArray.forEach((book) => {
        const div = document.createElement("div");
        div.classList.add("col-md-3");
        div.innerHTML=`
        <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h3 class="card-title">${book.title}</h3>
          <p class="card-text">First Publish:${book.first_publish_year}</p>
        </div>
      </div>
        `
     
      container.appendChild(div)
    });

}

 