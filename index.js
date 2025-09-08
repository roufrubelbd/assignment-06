// -------------- get all document by id -----------------

const categoriesContainer = document.getElementById('categories_container');
const allCategoriesContainerById = document.getElementById('all_categories_container_by_id');
const treesCardContainer = document.getElementById('trees_card_container');
// console.log(allCategoriesContainerById.childNodes)


// ------------------ 
// all plants
// -------------------


// ---------------- load categories menu from api -----------------
const loadCategories = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/categories');
        const data = await response.json();
        const categories = data.categories;
        showCategories(categories);
    } catch (error) {
        console.log('Error loading categories:', error);
    }
};


// ---------------- show categories menu in ui -----------------
const showCategories = (categories) => {
    categoriesContainer.innerHTML = "";
    categories.forEach(category => {
       categoriesContainer.innerHTML += `
        <li id="${category.id}" class="category-item hover:bg-green-600 hover:text-white px-3 py-2 rounded-md font-medium text-sm cursor-pointer">
            ${category.category_name}
        </li>
       `;
    });

    //  allCategoriesContainerById
    allCategoriesContainerById.addEventListener("click", (e) => {
    const allLi = allCategoriesContainerById.querySelectorAll("li");
    // console.log(allLi[0].innerHTML);
    allLi.forEach((li) => {
      li.classList.remove("bg-green-600", "text-white");
    });

    if (e.target.localName === "li") {
    //   showLoading()
      e.target.classList.add("bg-green-600", "text-white");
       loadTreesByCategory(e.target.id);
    }
  });
};


// ------------- load trees by category id -----------------
const loadTreesByCategory = async (categoryId) => {
    if (categoryId === "all_trees_01") {
        loadAllPlants();
        // return;
    } else {
        try {
        const response = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`);
        const data = await response.json();
        const trees = data.plants;
        showTreesByCategory(trees);
    } catch (error) {
        console.log('Error loading trees by category:', error);
    }
};
};


// ------------- show trees by category id -----------------
const showTreesByCategory = (trees) => {
    treesCardContainer.innerHTML = "";
    trees.forEach(tree => {
        console.log(tree)
        treesCardContainer.innerHTML += `
        <div class="card bg-white shadow-sm h-fit">
  <figure class="h-40">
    <img
      src="${tree.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${tree.name}</h2>
    <p class="text-sm line-shorten">${tree.description}</p>
    <div class="card-actions justify-between mt-4 font-semibold">
        <span class="text-sm bg-green-200 px-2 py-1 rounded-md">${tree.category}</span>
        <span class="text-sm">$ ${tree.price}</span>
    </div>
    <div class="card-actions justify-center">
      <button class="btn bg-green-600 text-white rounded-4xl w-full">Add to Cart</button>
    </div>
  </div>
</div>
       `;
    });
};



// ---------------- load all plants from api -----------------
const loadAllPlants = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/plants');
        const data = await response.json();
        const allPlants = data.plants;
        showAllPlants(allPlants);
    } catch (error) {
        console.log('Error loading all plants:', error);
    }
};


// ---------------- show all plants in ui -----------------
const showAllPlants = (allPlants) => {
     treesCardContainer.innerHTML = "";
    allPlants.forEach(plant => {
        // console.log(plant)
        treesCardContainer.innerHTML += `
        <div class="card bg-white shadow-sm">
  <figure class="h-40">
    <img
      src="${plant.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${plant.name}</h2>
    <p class="text-sm line-shorten">${plant.description}</p>
    <div class="card-actions justify-between mt-4 font-semibold">
        <span class="text-sm bg-green-200 px-2 py-1 rounded-md">${plant.category}</span>
        <span class="text-sm">$ ${plant.price}</span>
    </div>
    <div class="card-actions justify-center">
      <button onclick="getNameAndPriceById(${plant.id})" class="btn bg-green-600 text-white rounded-4xl w-full add_to_cart" id="${plant.id}">Add to Cart</button>
    </div>
  </div>
</div>
       `;
    });
};


// ---------------- add to cart button functionalities -----------------


let cart = [];
const getNameAndPriceById = async (id) => {
  const cartPlants = document.getElementById('cart_plants');
  const totalPrice = document.getElementById('total_price');
  const response = await fetch('https://openapi.programming-hero.com/api/plants');
  const data = await response.json();
  const allPlants = data.plants;
  const plant = allPlants.find(singlePlant => singlePlant.id === id);
  const name = plant.name;
  const price = plant.price;
  const quantity = 1;
  cart.push(plant);
  let total = 0;
  cart.forEach(item => {
    const itemPrice = item.price * quantity;
    total += itemPrice;
    totalPrice.innerText = total;
  });
  cartPlants.innerHTML += `
  <div class="flex justify-between items-center px-2 py-2 bg-green-50 border border-green-200 rounded-md mb-2">
    <div>
      <p class="font-bold">${name}</p>
    <p class="text-sm text-gray-500">$ ${price} x ${quantity}</p>
    </div>
    <div>
      <button onclick="removeFromCart(${plant.id})" class="btn btn-sm"><i class="fa-solid fa-xmark"></i></button>
    </div>
  </div>
  `;
}


 // --------- remove plant from cart -----------------
const removeFromCart = (id) => {
 
  cart = cart.filter(item => item.id !== id);

  const cartPlants = document.getElementById('cart_plants');
  const totalPrice = document.getElementById('total_price');
  cartPlants.innerHTML = "";
  let total = 0;
  cart.forEach(plant => {
    total += plant.price; 
    cartPlants.innerHTML += `
      <div class="flex justify-between items-center px-2 py-2 bg-green-50 border border-green-200 rounded-md mb-2">
        <div>
          <p class="font-bold">${plant.name}</p>
          <p class="text-sm text-gray-500">$ ${plant.price} x 1</p>
        </div>
        <div>
          <button onclick="removeFromCart(${plant.id})" class="btn btn-sm"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
    `;
  });

  totalPrice.innerText = total;
};

// -------------- call the load functions -----------------
loadAllPlants();
loadCategories();