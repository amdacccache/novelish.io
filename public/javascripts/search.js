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
let titleObject = {
  fiction: "Fiction",
  nonfiction: "Non-Fiction",
  romance: "Romance",
  mystery: "Mystery",
  classic: "Classics",
  scifi: "Science Fiction",
  graphicnovel: "Graphic Novels",
  other: "Other",
};
async function getGenreReviews() {
  const rawData = await fetch(
    `../reviews/search/${window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    )}`,
    {
      method: "GET",
    }
  );
  const parsedData = await rawData.json();
  searchTitle.textContent = `Search results for: ${window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  )}`;
  console.log(parsedData);
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
getGenreReviews();
