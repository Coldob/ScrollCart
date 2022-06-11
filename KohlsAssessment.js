let sLoc = 'above'; // used to prevent checkout scroll from opening immediately after closure
let subtotal = document.getElementsByClassName("subtotal")[0].innerText; //subtotal
let totalItems = Number(document.getElementsByClassName('number-items')[0].innerText); //total items starting from 1
let product = JSON.parse(window.localStorage.persistent_bar_components_json_v1); //where cart data is stored
let cartTotal = product.cartItems.length; //total items in cart not counting duplicates

function loop(num) { //loops creation of cart icons until it hits 4 items where it maxes
    if (num >=4){
        let i = 0;
        let product = JSON.parse(window.localStorage.persistent_bar_components_json_v1);
        for(; i<4;i++){
        
            let pSize = product.cartItems[i].itemProperties.size; //size of item
            let pImage = product.cartItems[i].itemProperties.image.url; // image of item
            let aText = product.cartItems[i].itemProperties.productTitle; // alt text
            let pPrice = product.cartItems[i].itemPriceInfo.saleUnitprice; //price of item
            let pQuant = product.cartItems[i].quantity; //quantity
            let PURL = product.cartItems[i].itemProperties.productSeoURL; //product URL
        
            let image = document.createElement('div');
            image.setAttribute('class','image');
            image.setAttribute('style',"border:1px solid #5f5f5f;");
            image.innerHTML = `<a href=" ${PURL}" title="${aText}">
            <img src="${pImage}" class="kas-newpb-product-image" draggable="false" alt="${aText}">
            </a>`;
            document.getElementsByClassName('items')[0].appendChild(image);
            var size = document.createElement('div');
            size.setAttribute('class','size');
            size.setAttribute('style','border-top: 1px solid #5f5f5f');
            size.innerText = `Size:${pSize}`;
            document.getElementsByClassName('image')[i].appendChild(size);
            var price = document.createElement('div');
            price.setAttribute('class','price');
            price.setAttribute('style','border-top: 1px solid #5f5f5f');
            price.innerText = `$${pPrice}`;
            document.getElementsByClassName('image')[i].appendChild(price);
            var quant = document.createElement('div');
            quant.setAttribute('class','quant');
            quant.setAttribute('style','border-top: 1px solid #5f5f5f; border-bottom: 1px solid #5f5f5f;');
            quant.innerText = `Quantity:${pQuant}`;
            document.getElementsByClassName('image')[i].appendChild(quant);
        }
    }else{
        let i = 0;
        let product = JSON.parse(window.localStorage.persistent_bar_components_json_v1);
        
        for(; i<cartTotal;i++){
        
            let pSize = product.cartItems[i].itemProperties.size; //size of item
            let pImage = product.cartItems[i].itemProperties.image.url; // image of item
            let aText = product.cartItems[i].itemProperties.productTitle; // alt text
            let pPrice = product.cartItems[i].itemPriceInfo.saleUnitprice; //price of item
            let pQuant = product.cartItems[i].quantity; //quantity
            let PURL = product.cartItems[i].itemProperties.productSeoURL; //product URL
        
            let image = document.createElement('div');
            image.setAttribute('class','image');
            image.setAttribute('style',"border:1px solid #5f5f5f;");
            image.innerHTML = `<a href=" ${PURL}" title="${aText}">
            <img src="${pImage}" class="kas-newpb-product-image" draggable="false" alt="${aText}">
            </a>`;
            document.getElementsByClassName('items')[0].appendChild(image);
            var size = document.createElement('div');
            size.setAttribute('class','size');
            size.setAttribute('style','border-top: 1px solid #5f5f5f');
            size.innerText = `Size:${pSize}`;
            document.getElementsByClassName('image')[i].appendChild(size);
            var price = document.createElement('div');
            price.setAttribute('class','price');
            price.setAttribute('style','border-top: 1px solid #5f5f5f');
            price.innerText = `$${pPrice}`;
            document.getElementsByClassName('image')[i].appendChild(price);
            var quant = document.createElement('div');
            quant.setAttribute('class','quant');
            quant.setAttribute('style','border-top: 1px solid #5f5f5f; border-bottom: 1px solid #5f5f5f;');
            quant.innerText = `Quantity:${pQuant}`;
            document.getElementsByClassName('image')[i].appendChild(quant);
        }
    }
}

function itemDisp() { //edits the navigation bar numbers shows number in cart and number total if past 4
    if (cartTotal>4) {
        return(`1 - 4 of ${totalItems}`);
    }else{
        return(`1 - ${totalItems}`);
    }
}
//arrows are not functional but would be a cool function to sort through newer items
function remove() { // this closes the popup when the X is clicked
    document.getElementsByTagName('body')[0].removeChild(btmOfPg);
    document.getElementsByTagName('body')[0].removeAttribute('style');
}

window.onscroll = function() {endOfPage()};
//this opens the popup when you reach the end of the page if proper conditions are met
function endOfPage() {
    //variables are rewritten here so you can rescroll tab and have it update after removing items from cart in microcart
    subtotal = document.getElementsByClassName("subtotal")[0].innerText;
    totalItems = Number(document.getElementsByClassName('number-items')[0].innerText);
    product = JSON.parse(window.localStorage.persistent_bar_components_json_v1);
    cartTotal = product.cartItems.length;
    let midText = itemDisp();

    if (totalItems!=0){
        if (window.scrollY > (document.body.scrollHeight-document.body.clientHeight)*.90 && sLoc == 'above'){

            sLoc = 'below'; // this makes it so the popup doesnt open as soon as its closed on scroll

            var btmOfPg = document.createElement('div');
            btmOfPg.setAttribute('id', 'btmOfPg');
            btmOfPg.innerHTML = `<div id="shade" style="position:fixed; z-index: 10000000; top: 0; right: 0; left: 0; bottom: 0; background: #000; opacity: 0.7;"></div>
            <div id="window" style="position:fixed; display:block; z-index: 100000021 !important; top: 50%; bottom: auto; left: 50%; width: 800px; background: #FFF; transform: translate(-50%, -50%);">
            <div id="topBar">
            <div class="navbar" style="position: absolute; display:inline-flex; padding-top:10px; padding-left:40px; color:#000; font-size:15px ">
            <div class= "prev"><</div>
            <div class="currentItems"style="padding-left:5px; padding-right:5px;">${midText}</div>
            <div class="next">></div>
            </div>
            <div class= "close" style="background: transparent; color:#000; text-align: right; font-size:20px; padding-right: 10px;">
            <button onclick="remove()" style="background-color: transparent;">X</button>
            </div>
            </div>
            <div class= "items" style="display:flex; justify-content:center; text-align:center; padding-bottom: 20px; padding-left: 5px"></div>
            <div class="pricebar" style="display:flex; justify-content:right; color:#000; font-size:16px; text-transform:uppercase;">
            <h4>Subtotal:</h4>
            <span style="padding-left:5px; padding-right:5px;">${subtotal}</span>
            <a href="/checkout/shopping_cart.jsp" title="View Shopping Cart" class="viewBag_ghr" style="border: 1px solid #5f5f5f;">
            <i class="boss-view-bag-ico_ghr"></i>
            <span style="padding:5px">View Cart</span>
            </a>
            </div>
            </div>
            `;
            document.getElementsByTagName('body')[0].appendChild(btmOfPg);
            document.getElementsByTagName('body')[0].style.overflow = 'hidden'; // prevents scrolling while popup is open
            loop(cartTotal); // adds items to popup
        } else {
            if(document.querySelector("#btmOfPg") === null){
                if (!(window.scrollY >= (document.body.scrollHeight-document.body.clientHeight)*.90)){
                    if(sLoc !== "above"){
                        sLoc = 'above';

                    }
                }
            }
        }
    }
}
