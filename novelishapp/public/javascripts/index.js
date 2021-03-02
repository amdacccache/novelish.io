let reviewsContainer = document.querySelector("#reviewsContainer");
let reviewsArray = [];
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
/*
<option selected>Genres</option>
                  <option value="fiction">Fiction</option>
                  <option value="nonfiction">Non-Fiction</option>
                  <option value="romance">Romance</option>
                  <option value="mystery">Mystery</option>
                  <option value="classic">Classic</option>
                  <option value="scifi">Sci-Fi</option>
                  <option value="grahpicnovel">Graphic Novel</option>
                  <option value="other">Other</option>
*/

async function getReviews() {
  const currentURL = window.location.origin + "/reviews";
  let response = await fetch(currentURL, { method: "GET" });
  response.json().then(function (results) {
    results.forEach((review) => {
      reviewsArray.push(review);
      let newReview = document.createElement("div");
      newReview.classList.add("row");
      newReview.classList.add("justify-content-center");
      newReview.innerHTML = `
        <div class="col-6"> 
          <div class="card mt-4">
            <img src="http://${window.location.hostname}:${
        window.location.port
      }/images/${imageObject[review.genre]}"/>
            <div class="card-body">
              <h2 class="card-title">${review.bookName}</h2>
              <h3 class="card-text">Reviewer: ${review.userName}</h3>
              <p class="card-text">
              ${review.userReview}
              </p>
              <a href="/update/${
                review._id
              }" class="btn btn-warning">Edit Review</a>
              <a href="/delete/${
                review._id
              }" class="btn btn-danger">Delete Review</a>
            </div>
          </div>
      </div>`;
      reviewsContainer.appendChild(newReview);
    });
  });
  console.log(reviewsArray);
}

getReviews();
