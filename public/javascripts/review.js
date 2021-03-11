let reviewContainer = document.querySelector("#reviewContainer");
let commentForm = document.querySelector("#commentForm");
let reviewId;
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
let deleteButton;
let reviewGenre;

async function getReviews() {
  const reviewURL =
    window.location.origin +
    `/reviews/${window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    )}`;
  let response = await fetch(reviewURL, { method: "GET" });
  response.json().then(function (review) {
    reviewId = review._id;
    reviewGenre = review.genre;
    let newReview = document.createElement("div");
    newReview.classList.add("row");
    newReview.classList.add("justify-content-center");
    newReview.innerHTML = `
        <div class="col-8"> 
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
              <a href="/update/${
                review._id
              }" class="btn btn-warning">Edit Review</a>
              <button id="deleteButton" class="btn btn-danger">Delete Review</button>
            </div>
          </div>
      </div>`;
    reviewContainer.appendChild(newReview);
    deleteButton = document.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteReview);
  });
}

async function deleteReview() {
  const reviewURL =
    window.location.origin +
    `/reviews/${window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    )}`;
  const response = await fetch(reviewURL, { method: "POST", 
  headers: {
    "Content-Type": "application/json",
  }, body: JSON.stringify({reviewId: reviewId, reviewGenre: reviewGenre}) });
  response.json().then(function (review) {
    if (review.deleted == true) {
      window.location.replace("/");
    }
  });
}

async function postComment(evt) {
  evt.preventDefault();
  console.log(reviewId);
  const commentFormData = new FormData(commentForm);
  const data = {
    commenterName: commentFormData.get("commenterName"),
    comment: commentFormData.get("commentText"),
    reviewId: reviewId,
  };
  console.log(data);
  const response = await fetch(`/comments/${reviewId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  const parsedResponse = await response.json();
}

commentForm.addEventListener("submit", postComment);

getReviews();
deleteReview();
