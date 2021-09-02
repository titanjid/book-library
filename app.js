
const welcomeSms=document.getElementById('welcome-sms');
const result=document.getElementsByClassName('result');
const resultNummber=document.getElementById('result-nummber');
const container= document.getElementById('divContainer');
const error=document.getElementById('error');
const spinner=document.getElementById('spinner')

document.getElementById('search-btn').addEventListener('click',function(){
    const searchField=document.getElementById('search-field')
    const searchText=searchField.value;
    welcomeSms.classList.add("d-none")
    searchField.value="";
    container.innerHTML="";
    error.innerText="";
    if(searchText===""){
     error.innerText='Search field cannot be empty'
    }else{
      const url=`http://openlibrary.org/search.json?q=${searchText}`
      spinner.classList.remove("d-none");
      welcomeSms.classList.add("d-none")
      fetch(url)
      .then(res => res.json())
      .then(data => {
          if(data.docs.length === 0||data.docs===undefined){
            error.innerText='No data found'
          }
          else{
              dispalyBook(data.docs)
          }
          spinner.classList.add("d-none");
          result[0].classList.remove('d-none');
          resultNummber.innerText=data.docs.length;
      })
    }

})
function dispalyBook(bookArray){
    bookArray.forEach((book) => {
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        if(book.cover_i){
          var src=`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
        }else{
          var src="img/book-img.jpg";
        }
        if(book.title){
          var BookName=`${book.title}`
        }
        else{
          var BookName="...";
        }
        if(book.publish_place){
          var publishPlace=`${book.publish_place}`
        }
        else{
          var publishPlace="...";
        }
        if(book.first_publish_year){
          var FirstPublish=`${book.first_publish_year}`
        }
        else{
          var FirstPublish="...";
        }
        if(book.language){
          var Language=`${book.language}`
        }
        else{
          var Language="...";
        }
        if(book.publisher){
          var publisher=`${book.publisher}`
        }
        else{
          var publisher="...";
        }
        div.innerHTML=`
        <div class="card mb-3">
        <img src="${src}" class="card-img-top w-50 h-25 rounded mx-auto d-block book-img" alt="...">
        <div class="card-body">
          <h3 class="card-title">Book Name:${BookName}</h3>
          <p class="card-text">First Publish:${FirstPublish}</p>
          <a>publisher:${publisher}</a>
          <p class="card-text">Language:${Language}</p>
          <p class="card-text">publish Place:${publishPlace}</p>
        </div>
      </div>
        `
      container.appendChild(div)
    });
}