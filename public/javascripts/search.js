let reviewsContainer = document.querySelector("#reviewsContainer");
let searchTitle = document.querySelector("#genreTitle");
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
async function getSearchReviews() {
  const rawData = await fetch(
    `../reviews/search/${window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    )}`,
    {
      method: "GET",
    }
  );
  const parsedData = await rawData.json();
  let searchQueryString = window.location.href
    .substring(window.location.href.lastIndexOf("/") + 1)
    .replaceAll("%20", " ");
  searchTitle.textContent = `Search results for: ${searchQueryString}`;
  if (parsedData.length == 0) {
    reviewsContainer.innerHTML = "<h3>No search results found!</h3>";
  }
  parsedData.forEach((review) => {
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
}
getSearchReviews();
