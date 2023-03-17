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
    const isBookmarked = checkIsBookmark(product.id);
    console.log(isBookmarked);
    card.innerHTML = `
          <div class="bookmark-icon">
         
          <i onclick="${
            isBookmarked
              ? `removeBookmark('${product.id}')`
              : `handleBookmark('${product?.name}','${product?.price}','${product?.id}','${product?.image}')`
          }" class="${
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

const handleBookmark = (name, price, id, image) => {
  //   console.log(name, price, id, image);

  const previousBookmark = JSON.parse(localStorage.getItem("bookmark"));
  const currentMarkedItem = { name, price, id, image, bookmarked: true };
  let bookmark = [];
  if (previousBookmark) {
    const isThisItemMarked = previousBookmark.find((pd) => pd.id == id);
    console.log(isThisItemMarked);
    if (isThisItemMarked) {
      alert("this product already bookmarked !!!");
      return 0;
    } else {
      bookmark.push(...previousBookmark, currentMarkedItem);
      localStorage.setItem("bookmark", JSON.stringify(bookmark));
    }
  } else {
    bookmark.push(currentMarkedItem);
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
  }
  checkIsBookmark(id);
};
const removeBookmark = (id) => {
  const previousBookmark = JSON.parse(localStorage.getItem("bookmark"));

  if (previousBookmark) {
    const removeItem = previousBookmark?.filter(
      (bookmark) => bookmark.id != id
    );
    localStorage.setItem("bookmark", JSON.stringify(removeItem));
  }
  checkIsBookmark(id);
};

const checkIsBookmark = (id) => {
  const previousBookmark = JSON.parse(localStorage.getItem("bookmark"));

  const isExist = previousBookmark?.find((pd) => pd.id == id);
  console.log(id);
  if (isExist) {
    return true;
  } else {
    return false;
  }
};

loadProduct();

{
  /* <i onclick="handleBookmark('${product?.name}','${product?.price}','${product?.id}','${product?.image}')" class="fa-regular fa-bookmark" />
    
    <i onclick="removeBookmark('${product.id}')" class="fa-solid fa-bookmark"></i> */
}
