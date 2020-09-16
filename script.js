const link = "https://spreadsheets.google.com/feeds/list/1qu1yHszHhwM0F7lABGy_iq63-XnVuDvnkFQH92jnkIc/od6/public/values?alt=json"

//loop through products
function dataReceived(products) {
    console.log(products);
    products.feed.entry.forEach(showProduct);

    //    products.forEach(showInfo)
}

//executed once for each product
function showProduct(myProduct) {

    //finding template
    const temp = document.querySelector("#productTemplate").content;
    //clone the template
    const myCopy = temp.cloneNode(true);
    myCopy.querySelector(".data_name").textContent = myProduct.gsx$name.$t;
    myCopy.querySelector(".data_type").textContent = myProduct.gsx$type2.$t;
    myCopy.querySelector(".data_difficulty").textContent = `Difficulty: ${myProduct.gsx$difficulty.$t}`;

    const img = myCopy.querySelector(".product_image");
    img.setAttribute("src", `http://a-day.dk/module-07-yoga/web/imgs/poses/${myProduct.gsx$image.$t}`)



    //FILTERING
    //balance
    const article = myCopy.querySelector("article");
    if (myProduct.gsx$type2.$t.includes("Balance")) {
        article.classList.add("balance")
    }

    const balancefilter = document.querySelector("#balancefilter");
    balancefilter.addEventListener("click", balanceFilterClicked);

    function balanceFilterClicked() {
        balancefilter.classList.toggle("active");
        const articles = document.querySelectorAll("article:not(.balance)");
        articles.forEach(elem => {
            elem.classList.toggle("hidden")
        })
    }

    //stretch
    if (myProduct.gsx$type2.$t.includes("Stretch")) {
        article.classList.add("stretch")
    }

    const stretchfilter = document.querySelector("#stretchfilter");
    stretchfilter.addEventListener("click", stretchFilterClicked);

    function stretchFilterClicked() {
        stretchfilter.classList.toggle("active");
        const articles = document.querySelectorAll("article:not(.stretch)");
        articles.forEach(elem => {
            elem.classList.toggle("hidden")
        })
    }

    //strength
    if (myProduct.gsx$type2.$t.includes("Strength")) {
        article.classList.add("strength")
    }

    const strenghtfilter = document.querySelector("#strengthfilter");
    strengthfilter.addEventListener("click", strengthFilterClicked);

    function strengthFilterClicked() {
        strengthfilter.classList.toggle("active");
        const articles = document.querySelectorAll("article:not(.strength)");
        articles.forEach(elem => {
            elem.classList.toggle("hidden")
        })
    }


    myCopy.querySelector("article").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=` + myProduct.id)
            .then(res => res.json())
            .then(showDetails);
    });

    //https://spreadsheets.google.com/feeds/list/1qu1yHszHhwM0F7lABGy_iq63-XnVuDvnkFQH92jnkIc/od6/public/values?alt=json

    document.querySelector("section").appendChild(myCopy);
}

function showDetails(myProduct) {
    console.log(products);
    const img = modal.querySelector(".modal-image");
    img.setAttribute("src", `http://a-day.dk/module-07-yoga/web/imgs/poses/${myProduct.gsx$image.$t}`)

    modal.querySelector(".modal-name").textContent = myProduct.gsx$name.$t;
    modal.querySelector(".modal-name2").textContent = myProduct.gsx$name2.$t;
    modal.querySelector(".modal-difficulty").textContent = myProduct.gsx$difficulty.$t;
    modal.querySelector(".modal-type").textContent = myProduct.gsx$type2.$t;
    modal.querySelector(".modal-description").textContent = myProduct.longdescription;

    modal.classList.remove("hidden");
}


getData();

function getData(cats) {
    //    createSections(cats);
    //fetch data

    fetch(link)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            dataReceived(data);
        })

}


//---------------SORTING----------------

//const data = ??
//
//function compareLevel(a, b) {
//    if (a.gsx$level.$t < b.gsx$level.$t) {
//        return -1;
//    }
//    if (a.gsx$level.$t > b.gsx$level.$t) {
//        return 1;
//    }
//    return 0;
//}
//data.sort(compareLevel);


//-----------SORTING END----------------


function createSections(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        section.setAttribute("id", gsx$category.$t);
        const h1 = document.createElement("h6");
        h6.textContent = gsx$category.$t;
        section.appendChild(h6);
        document.querySelector(".productlist").appendChild(section);
    })
}


//close the modal when clicked
const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hidden");
    //    modal.querySelector(".vegmodal").classList.add("hidden");
    //    modal.querySelector(".alcmodal").classList.add("hidden");
    //    modal.querySelector(".soldouttext").classList.add("hidden");
    //    modal.querySelector(".modal-content").style.filter = "grayscale(0)";
    //    modal.classList.remove("relaxin");
    //    modal.classList.add("relaxout");
    //    modal.addEventListener("animationend", hideBackground);

});
//
//function hideBackground() {
//    modal.classList.remove("relaxout");
//
//}
