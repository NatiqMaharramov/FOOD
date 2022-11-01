let sebetContainer = document.querySelector(".sebetContainer");

let back = document.querySelector("#back");

let sebetTotalCount=document.querySelector('#sebetTotalCount')
let sebetTotalPrice=document.querySelector('#sebetTotalPrice')

let basket = [];
console.log(sebetContainer);
function showSebet() {
  let totalPrice=0 
  sebetContainer.innerHTML = "";
  basket.forEach((e) => {
    console.log(e);
    totalPrice+=e.countPrice
    sebetContainer.innerHTML += `
      
      <div class="sebet_card">
      <div class='left'>
      <img src=${e.Image} alt="">
      <p>price:${e.price} $</p>
      </div>

      <div class='right'>
      <p>TotalPrice:${e.countPrice}</p>     
      <button name='artir' onclick="azcox(event,${e.id})">+</button>
      <p>${e.count}</p>
      <button name='azalt' onclick="azcox(event,${e.id})">-</button>
      </div>
    </div>
       `;
  });
  sebetTotalCount.innerHTML=basket.length
  sebetTotalPrice.innerHTML=totalPrice
}
window.addEventListener("load", () => {
  if (localStorage.getItem("sebet")) {
    basket = JSON.parse(localStorage.getItem("sebet"));
  }
  showSebet();
});

function azcox(e, id) {
  let checkCard = basket.find((e) => e.id == id);
  if (e.target.name == "artir") {
    checkCard.count+=1;
  } else {
    checkCard.count-=1;
  }

  if(checkCard.count===0){

    let delet=basket.findIndex(e=>e.id===+id)
    basket.splice(delet,1)
  }
  checkCard.countPrice=checkCard.count*checkCard.price
  localStorage.setItem('sebet',JSON.stringify(basket))

  showSebet();
}

back.addEventListener('click',()=>{

    window.location.pathname='index.html'

})