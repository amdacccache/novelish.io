let reviewsContainer = document.querySelector("#reviewsContainer");
let loadingTitle = document.querySelector("#loadingTitleText");
let searchForm = document.querySelector("#searchForm");
let imageObject = {
  fiction: "fiction.png",
  nonfiction: "nonfic.png",
  romance: "romance.png",
  mystery: "mystery.png",
  classic: "classics.png",
  scifi: "scifi.png",
  graphicnovel: "graphic.png",
  other: "other.png",
};

async function getReviews() {
  const currentURL = window.location.origin + "/reviews";
  let response = await fetch(currentURL, { method: "GET" });
  response.json().then(function (results) {
    if (results.length == 0) {
      loadingTitle.textContent = "No Reviews Yet!";
    } else {
      loadingTitle.style.display = "none";
    }
    results.forEach((review) => {
      let newReview = document.createElement("div");
      newReview.classList.add("row");
      newReview.classList.add("justify-content-center");
      newReview.innerHTML = `
        <div class="col-5">
          <a href="/review/${review._id}">
            <div class="card mt-4">
              <img src="/images/${imageObject[review.genre]}"/>
              <div class="card-body">
                <h2 class="card-title">${review.bookName}</h2>
                <h3 class=card-text">${review.authorName}</h3>
                <h4 class="card-text">Reviewer: ${review.userName}</h4>
                <h4 class="card-text staticRating">${review.rating}</h4>
                <p class="card-text">
                ${review.userReview}
                </p>
              </div>
            </div>
          </a>
      </div>`;
      reviewsContainer.appendChild(newReview);
    });
  });
}

searchForm.addEventListener("submit", async function (evt) {
  evt.preventDefault();
  const searchFormData = new FormData(searchForm);
  const searchQuery = searchFormData.get("searchQuery");
  const formatedSearchQuery = searchQuery.replaceAll(" ", "%20");
  window.location.replace(`/search/${formatedSearchQuery}`);
});

getReviews();
