// get total 
// create products
// save local storage
// clear inputs after create 
// read
// delete
// count
// update
// search
// clean data

let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let mood = 'create'
let temp;
//1. get total

function getTotal(){
    if(price.value != ''){
         let res = +price.value + +taxes.value + +ads.value - +discount.value;
         total.innerHTML = res;
         total.style.background = '#040';
    }
    else{
         total.style.background = '#f0a';
         total.innerHTML = ''
    }
       
}
// create product
// save in localstorage
let pro;
if(localStorage.product != null){
    pro = JSON.parse(localStorage.getItem('product'))
}
else{
    pro = []
}

submit.onclick = function(){
    let newProduct = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value, 
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value ,
        category : category.value.toLowerCase(),
    }
   if(title.value !='' && price.value !='' && category.value != '' && newProduct.count < 100)
    {
        //count
       if(mood === 'create'){
         if(newProduct.count > 1)
        {
            for(let i = 0 ; i < newProduct.count ; i++)
            {
                 pro.push(newProduct)
            }
        }
            else
            {
                 pro.push(newProduct)
            }
       }
       // update item
       else{
        pro[temp] = newProduct;
        mood = 'create'
        count.style.display = 'block'
        submit.innerHTML= 'Create'
        
        
    }
}

        localStorage.setItem('product', JSON.stringify(pro))
        clearData();
        showData();
    }
 // clear inputs after create 

function clearData(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';

}

// reads

showData()  // to show data when relod browser
function showData(){
getTotal();
let table =''
for(let i = 0 ; i < pro.length ; i++){
    table +=  `
        <tr>
                <td>${i+1}</td>
                <td>${pro[i].title}</td>
                <td>${pro[i].price}</td>
                <td>${pro[i].taxes}</td>
                <td>${pro[i].ads}</td>
                <td>${pro[i].discount}</td>
                <td>${pro[i].total}</td>
                <td>${pro[i].category}</td>
                <td onclick="updateItem(${i})"><button id="update">update</button></td>
                <td onclick="deleteItem(${i})"><button id="delete">delete</button></td>
         </tr>
    `
}
document.getElementById('tbody').innerHTML = table;
let btnDelete = document.getElementById('deleteall')
if(pro.length > 0){
    btnDelete.innerHTML =`<button> Delete All (${pro.length}) </button> `
}
else{
    btnDelete.innerHTML = ''
}

}

// delete product

function deleteItem(i){
   pro.splice(i,1)
   localStorage.product = JSON.stringify(pro)
   showData();
}
// deleteall
function DleteAllitem(){
    pro=[];
    localStorage.product =JSON.stringify(pro)
    showData()
}
// update 
function updateItem(i){
    title.value = pro[i].title;
    price.value = pro[i].price;
    taxes.value = pro[i].taxes;
    ads.value = pro[i].ads;
    discount.value = pro[i].discount;
    category.value = pro[i].category;     
    getTotal();
    count.style.display='none';
    submit.innerHTML = 'Update'
    mood = 'update'
    temp = i;
    scroll({
        top :0,
        behavior:'smooth'
    })
}

// search 

let searchmood = 'title';

function getsearchitem(id){
    
    let search = document.getElementById('search');
    if(id == 'searchbytitle'){
        searchmood = 'title';
       
    }
    else{
        searchmood = 'category'
     
    }
        search.placeholder = 'search by '+ searchmood
    search.focus();
    search.value = ''
    showData()

    
}

function searchItem(value){

    let table = '';

     for(let i = 0 ; i < pro.length ; i++){
    if(searchmood == 'title'){


       
            if(pro[i].title.includes(value.toLowerCase())){

                 table +=  `
        <tr>
                <td>${i}</td>
                <td>${pro[i].title}</td>
                <td>${pro[i].price}</td>
                <td>${pro[i].taxes}</td>
                <td>${pro[i].ads}</td>
                <td>${pro[i].discount}</td>
                <td>${pro[i].total}</td>
                <td>${pro[i].category}</td>
                <td onclick="updateItem(${i})"><button id="update">update</button></td>
                <td onclick="deleteItem(${i})"><button id="delete">delete</button></td>
         </tr>
    `
            }
        
    }
    else{

       
            if(pro[i].category.includes(value.toLowerCase())){

                 table +=  `
        <tr>
                <td>${i}</td>
                <td>${pro[i].title}</td>
                <td>${pro[i].price}</td>
                <td>${pro[i].taxes}</td>
                <td>${pro[i].ads}</td>
                <td>${pro[i].discount}</td>
                <td>${pro[i].total}</td>
                <td>${pro[i].category}</td>
                <td onclick="updateItem(${i})"><button id="update">update</button></td>
                <td onclick="deleteItem(${i})"><button id="delete">delete</button></td>
         </tr>
    `
            }
        





    }
}
    document.getElementById('tbody').innerHTML = table;
}

// clean data