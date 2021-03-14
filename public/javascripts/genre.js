let reviewsContainer = document.querySelector("#reviewsContainer");
let genreTitle = document.querySelector("#genreTitle");
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
    // `${window.location.protocol}//${window.location.hostname}:${window.location.port}/reviews${window.location.pathname}`,
    `${window.location.origin}/reviews/${window.location.pathname}`,
    {
      method: "GET",
    }
  );
  const parsedData = await rawData.json();
  console.log(parsedData);
  parsedData.forEach(async (review) => {
    const rawData = await fetch(
      `${window.location.origin}/reviews/${review.reviewID}`
    );
    const genreReview = await rawData.json();
    genreTitle.textContent = `${titleObject[genreReview.genre]} Books`;
    let newReview = document.createElement("div");
    newReview.classList.add("row");
    newReview.classList.add("justify-content-center");
    newReview.innerHTML = `
        <div class="col-6">
          <a href="/review/${genreReview._id}">
            <div class="card mt-4">
              <img src="/images/${imageObject[genreReview.genre]}"/>
              <div class="card-body">
                <h2 class="card-title">${genreReview.bookName}</h2>
                <h3 class=card-text">${genreReview.authorName}</h3>
                <h4 class="card-text">Reviewer: ${genreReview.userName}</h4>
                <h4 class="card-text staticRating">${genreReview.rating}</h4>
                <p class="card-text">
                ${genreReview.userReview}
                </p>
              </div>
            </div>
          </a>
      </div>`;
    reviewsContainer.appendChild(newReview);
  });
}
getGenreReviews();
