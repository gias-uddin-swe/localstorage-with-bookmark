const loadProduct = () => {
  fetch("./product.json")
    .then((response) => response.json())
    .then((data) => displayProduct(data));
};

const displayProduct = (data) => {
  const cards = document.getElementById("cards");
  data.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card", "m-2");
    const isBookmarked = checkBookmark(product.id);
    console.log(isBookmarked);

    card.innerHTML = `
          <div class="bookmark-icon">
        
          <i onclick="${
            isBookmarked
              ? `handleRemoveBookmark('${product.id}')`
              : `handleBookmark('${product.name}','${product.id}','${product.price}')`
          }" 
           class="${
             isBookmarked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"
           }"></i>


        </div>
        <div class="product-img-container">
          <img
            class="product-img"
            src=${product.image}
            alt=""
          />
        </div>
        <h3>${product.name}</h3>
        <p>The Widget 3000 is the latest and greatest in widget</p>
        <div class="priceAndButtons">
          <h2 class="text-primary">$${product.price}</h2>
          <button class="btn btn-primary">Buy Now</button>
        </div>
          `;
    cards.appendChild(card);
  });
};

// ! handle book mark

const handleBookmark = (name, id, price) => {
  const previousBookmark = JSON.parse(localStorage.getItem("bookmark"));
  let bookmark = [];
  const product = { name, id, price, bookmark: true };

  if (previousBookmark) {
    const isThisProductMarked = previousBookmark.find((pd) => pd.id == id);
    if (isThisProductMarked) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "already bokmakred",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    } else {
      bookmark.push(...previousBookmark, product);
      localStorage.setItem("bookmark", JSON.stringify(bookmark));
      console.log(bookmark);
    }
  } else {
    bookmark.push(product);
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
  }
};
const handleRemoveBookmark = (id) => {
  const previousBookmark = JSON.parse(localStorage.getItem("bookmark"));
  const restOfThem = previousBookmark.filter((product) => product.id != id);
  localStorage.setItem("bookmark", JSON.stringify(restOfThem));
};

const checkBookmark = (id) => {
  const previousBookmark = JSON.parse(localStorage.getItem("bookmark"));

  const isBookmarked = previousBookmark?.find((product) => product.id == id);
  if (isBookmarked) {
    return true;
  } else {
    return false;
  }
};

loadProduct();
