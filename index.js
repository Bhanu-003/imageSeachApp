// const accessKey = wrTyeKhMmkYzh06_Jfgk2-ntlHeU6Ap7uCLNMVlhpdI;

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultEl = document.querySelector(".search-results");
const showMoreEl = document.getElementById("show-more-button");
let inputData = "";
let page = 1;
async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=wrTyeKhMmkYzh06_Jfgk2-ntlHeU6Ap7uCLNMVlhpdI`;
  //   console.log(url); to know the url
  const response = await fetch(url);
  const data = await response.json();
  //   console.log(data); to know the data
  if (page === 1) {
    searchResultEl.innerHTML = "";
  }

  const results = data.results;
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultEl.appendChild(imageWrapper);
  });
  page++;
  //   console.log(results);
  if (page > 1 && page < 1000) {
    showMoreEl.style.display = "block";
  }
}
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreEl.addEventListener("click", () => {
  searchImages();
});
