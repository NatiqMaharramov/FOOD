let grid_container = document.querySelector(".grid_container")
let sebet=document.querySelector(".sebet")
let load_btn=document.querySelector(".load_btn")
let count=document.querySelector(".count")



let basket=[]
let length;


async function showFoods(index) {
  grid_container.innerHTML = ''
  await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i")
    .then(resp => resp.json())
    .then(data => {

      length=data.meals.length
      data.meals.forEach((meal, i) => {
        if (index > i) {
          grid_container.innerHTML += `
        <div class="grid_card">
        <div class="card_img">
          <img src=${meal.strMealThumb} alt="">
        </div>
        <div class="card_text">
          <div class="food_about">
            <h3>${meal.strMeal.slice(0, 20)}</h3>
            <p>$ ${Number(meal.idMeal.slice(-3, -1))}</p>
          </div>
          <div class="card_text_bottom">
            <div class="card_l">
              <p><i class="fa-solid fa-star"></i> 4.7</p>
              <p>50-79 min</p>
            </div>
            <div class="card_r">
              <button onclick="addSebet(${meal.idMeal})"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>
        </div>
      </div>
        `
        }
      });


    })

}


window.addEventListener('load', () => {
  showFoods(8)
  count.innerHTML=basket.length
})

sebet.addEventListener('click',()=>{
window.location.pathname='sebet.html'
})


let x=8

load_btn.addEventListener('click',()=>{

//  if(x%2==0){
//   showFoods(8+x)
//   x+=8
//  }

//  console.log(length);
x=x+8;
if(x>length){
showFoods(length);
load_btn.style.display='none'

}
else{
  showFoods(x)
}


  
})



if(localStorage.getItem('sebet')){
  basket=JSON.parse(localStorage.getItem('sebet'))
}

function addSebet(id){

  let findItem=basket.find(e=>e.food_id==id)
  if(!findItem){

    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i")
    .then(resp => resp.json())
    .then(data => {
      let findFood=data.meals.find(e=>e.idMeal==id)
      let newItem={

        id:basket.length+1,
        food_id:findFood.idMeal,
        price:Number(findFood.idMeal.slice(-3, -1)),
        name:findFood.strMeal.slice(0,20),
        Image:findFood.strMealThumb,
        count:1,
        countPrice:Number(findFood.idMeal.slice(-3, -1))
      }
      // console.log(newItem);

      basket.push(newItem)
      count.innerHTML=basket.length
      localStorage.setItem('sebet',JSON.stringify(basket))

    })
  }else{
    findItem.count++
    findItem.countPrice=findItem.count*findItem.price;
    localStorage.setItem('sebet',JSON.stringify(basket))
    count.innerHTML=findItem.id
    console.log(findItem);
  }

}

