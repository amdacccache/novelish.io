let reviewsContainer = document.querySelector("#reviewsContainer");
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
    let newReview = document.createElement("div");
    newReview.classList.add("row");
    newReview.classList.add("justify-content-center");
    newReview.innerHTML = `
        <div class="col-6"> 
          <div class="card mt-4">
            <img src="http://${window.location.hostname}:${
      window.location.port
    }/images/${imageObject[genreReview.genre]}"/>
            <div class="card-body">
              <h2 class="card-title">${genreReview.bookName}</h2>
              <h3 class="card-text">Reviewer: ${genreReview.userName}</h3>
              <p class="card-text">
              ${genreReview.userReview}
              </p>
              <a href="/update/${
                genreReview._id
              }" class="btn btn-warning">Edit Review</a>
              <a href="/delete/${
                genreReview._id
              }" class="btn btn-danger">Delete Review</a>
            </div>
          </div>
      </div>`;
    reviewsContainer.appendChild(newReview);
  });
}
getGenreReviews();
