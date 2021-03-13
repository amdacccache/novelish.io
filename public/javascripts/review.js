let reviewContainer = document.querySelector("#reviewContainer");
const commentsContainer = document.querySelector("#commentsContainer");
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

async function getReview() {
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
        <div class="col-5"> 
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
    reloadComments();
  });
}

async function deleteReview() {
  const reviewURL =
    window.location.origin +
    `/reviews/${window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    )}`;
  const response = await fetch(reviewURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reviewId: reviewId, reviewGenre: reviewGenre }),
  });
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
  commentForm.reset();
  reloadComments();
}

async function reloadComments(evt) {
  commentsContainer.innerHTML = "";
  const response = await fetch(`/comments/${reviewId}`, { method: "GET" });
  response.json().then(function (comments) {
    comments.forEach((comment) => {
      console.log(comment);
      renderComment(comment);
    });
  });
}

async function renderComment(commentObject) {
  let newCommentDiv = document.createElement("div");
  newCommentDiv.classList.add("row");
  newCommentDiv.classList.add("justify-content-center");
  newCommentDiv.innerHTML = `
    <div class="col"> 
      <div class="card mt-4">
        <div class="card-body">
          <p class="card-title"><strong>${commentObject.commenter}</strong></p>
          <p class=card-text">${commentObject.comment}</p>
          <button id="deleteButton${commentObject._id}" class="btn btn-danger">Delete Comment</button>
        </div>
      </div>
  </div>`;
  commentsContainer.appendChild(newCommentDiv);
  document
    .querySelector(`#deleteButton${commentObject._id}`)
    .addEventListener("click", async function (evt) {
      const response = await fetch(`/comments/${commentObject._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentID: commentObject._id }),
      });
      response.json().then(function (comment) {
        if (comment.deleted == true) {
          reloadComments();
        }
      });
    });
}

commentForm.addEventListener("submit", postComment);

getReview();
