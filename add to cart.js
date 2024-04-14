let carts=document.querySelectorAll('.btn');

/*

for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',() =>{
        cartnumbers();
    })
} 

let products=[
    {
        name: 'Grey TshirtShirt By Enjoy Dude',
        tag: 'greytshirt',
        price: 999,
        incart: 0
    },
    {
        name: 'Green Tshirt',
        tag: 'greentshirt',
        price: 15,
        incart: 0
    },
    {
        name: 'Red Tshirt',
        tag: 'redthirt',
        price: 100,
        incart: 0
    },
    {
        name: 'Blue Tshirt',
        tag: 'bluetshirt',
        price: 200,
        incart: 0
    }
];*/

for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',() =>{
        cartnumbers(products[i]);
        totalcost(products[i]);
    })
}  


function onloadcartnumbers(){
    let productnumbers=localStorage.getItem('cartnumbers');

    if(productnumbers){
        document.querySelector('.navlink span').textContent=productnumbers;
    }
}

function cartnumbers(product) {
    let productnumbers=localStorage.getItem('cartnumbers');

    productnumbers=parseInt(productnumbers);

    
    if(productnumbers){
        localStorage.setItem('cartnumbers', productnumbers+1);
        document.querySelector('.navlink span').textContent=productnumbers+1;
        
    }
    else{
        localStorage.setItem('cartnumbers', 1)
        document.querySelector('.navlink span').textContent=1;
    }

    setItems(product);
    

    
}

function setItems(product){
    let cartItems=localStorage.getItem('productsIncart');
    cartItems=JSON.parse(cartItems);
    //console.log("my cartitems",cartItems)
    if(cartItems != null){
        if(cartItems[product.tag] ==undefined){
            cartItems={
                ...cartItems,[product.tag]:product
            }
        }
        cartItems[product.tag].incart +=1;
    }else{
        product.incart=1;
        cartItems={
            [product.tag]:product
        }

    }

    
   

    
    localStorage.setItem("productsIncart",JSON.stringify(cartItems));

}

function totalcost(product){
   // console.log("the produt price is",product.price);
   let cartcost=localStorage.getItem("totalcost");
   

  // console.log("my cart cost is",cartcost);
  // console.log(typeof cartcost)

   if(cartcost !=null){
    cartcost=parseInt(cartcost);
    localStorage.setItem("totalcost",cartcost+product.price);
   }else{
    localStorage.setItem("totalcost",product.price);
   }
    
   

}

function displaycart(){
    


    let cartItems=localStorage.getItem("productsIncart");
    cartItems=JSON.parse(cartItems);
    let productcontainer=document.querySelector(".poruls");

    let cartcost=localStorage.getItem("totalcost");

    console.log(cartItems);
   
    
    if(cartItems && productcontainer){
        productcontainer.innerHTML='';
        Object.values(cartItems).map( item=> {
            productcontainer.innerHTML +=`
            <li>
            <div class="porul">
                <div class="close">
                <i class="fa fa-window-close" aria-hidden="true" ></i>
                </div> 
                <img src="./images/${item.tag}.jpg">
                <span class="producttext">${item.name}</span>   
            
                <div class="pricee">${item.price}</div>
                <div class="quantityy">
                   <i class="fa-solid fa-square-plus"></i>
                   <span>${item.incart}</span>
                   <i class="fa-solid fa-square-minus"></i>
                </div>
                <div class="totall">
                ₹${item.incart*item.price},00
                </div>
                
            </div></li>
           

            `;
        });

        productcontainer.innerHTML  +=`
        <div class="baskettotalcontainer">
            <h4 class="baskettotaltitle">
             basket total
            </h4>
            <h4 class="baskettotal">
              ₹${cartcost},00
            </h4>
        </div>
        `;
      }
      

}


onloadcartnumbers();
displaycart();
/*

function remove(){
    var element=document.getElementsByClassName("porul");
    element.remove();
}*/
var parent=document.getElementById("poruls");
var child=parent.getElementsByTagName("li")[0];
 


function remove(){
    child.remove();
}

let close=document.querySelectorAll('.close');


for(let j=0;j<close.length;j++){
     close[j].addEventListener('click',()=>{
        
      
        
     localStorage.removeItem('cartnumbers');
     localStorage.removeItem('productsIncart');
     localStorage.removeItem('totalcost');
     remove();
     location.reload(true);
    
    
    
     })
} 


