var siteName = document.getElementById("siteName");
var url = document.getElementById("url");
var submitBtn = document.getElementById("submitBtn");
var tableContainer = document.getElementById("tableContainer");
var urlValidation = document.querySelector('.urlValidation');
var nameValidation = document.querySelector('.nameValidation');
var emptyTable = document.querySelector('.emptyTable');
var result = document.getElementById('result')

var currentIndex = 0;



 if(localStorage.getItem("bookmarks") != null) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    bookmarksList = bookmarks;
    displayBookmarks()
    checkEmptyTable()
    
 } else {
    
    var bookmarksList = []
 }

 

function addBookmark() {
    var newObject = {siteName: siteName.value, url: url.value};   
    if(newObject.siteName.length !== 0 || newObject.url.length !== 0) {
        bookmarksList.push(newObject);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));   
        displayBookmarks()
    }else {
        alert("Error: Inputs should not be empty")
    }
 
    checkEmptyTable()
    
    clearForm()
}

function validateURL() {
    var regex = /^(https?:\/\/)?www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/
    if(regex.test(url.value)) {
        urlValidation.classList.add('d-none')
        url.classList.add("is-valid")
        url.classList.remove("is-invalid")
    }else {
        urlValidation.classList.remove('d-none')
        url.classList.add("is-invalid")
        url.classList.remove("is-valid")
    }
}

function validateSiteName() {
    var regex = /^[a-zA-Z][a-zA-Z0-9 ]{2,49}$/;

    if(regex.test(siteName.value)) {
        nameValidation.classList.add('d-none')
        siteName.classList.add("is-valid")
        siteName.classList.remove("is-invalid")
        console.log('match');
        
    }else {
        nameValidation.classList.remove('d-none')
        siteName.classList.add("is-invalid")
        siteName.classList.remove("is-valid")
        
    }
}

function displayBookmarks() {
    var bookmark = ``;
    
    for(var i=0; i < bookmarksList.length; i++) {
        currentIndex = i;
        bookmark += `
            <tr>
                <td>${i}</td>
                <td>${bookmarksList[i].siteName}</td>              
                <td>
                    <a href="${bookmarksList[i].url}" class="btn btn-visit btn-info btn-sm"  target="_blank">
                        <i class="fa-solid fa-eye pe-2"></i>Visit
                    </a>
                </td>
                <td>
                    <button onclick="deleteItem(${currentIndex})" class="btn btn-danger btn-sm btn-delete pe-2" >
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                    </button>
                </td>
            </tr>
            `;
    }    

    tableContainer.innerHTML = bookmark;
    
}

function deleteItem(index) {
    bookmarksList.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));   
    checkEmptyTable()
    displayBookmarks()
    
}

submitBtn.addEventListener('click', addBookmark)


function checkEmptyTable() {
    if(bookmarksList.length == 0) {
        emptyTable.classList.remove('d-none')
        result.classList.add('d-none')
    }else {
        emptyTable.classList.add('d-none')
        result.classList.remove('d-none')
    }
}

function clearForm() {
    siteName.value = "";
    url.value = "";
    siteName.classList.remove("is-valid")
    url.classList.remove("is-valid")
}








