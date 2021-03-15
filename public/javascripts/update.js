const updateForm = document.querySelector("#updateReviewForm");
const unsuccessfulAlert = document.querySelector("#dangerAlert");
unsuccessfulAlert.style.display = "none";
let genreOptions = {
  fiction: "fictionOption",
  nonfiction: "nonfictionOption",
  romance: "romanceOption",
  mystery: "mysteryOption",
  classic: "classicOption",
  scifi: "scifiOption",
  graphicnovel: "graphicnovelOption",
  other: "otherOption",
};
let ratingOptions = {
  "★★★★★": "fiveStar",
  "★★★★": "fourStar",
  "★★★": "threeStar",
  "★★": "twoStar",
  "★": "oneStar",
};
let previousGenre;

async function getOriginalReviewData() {
  const results = await fetch(
    `/reviews/${window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    )}`,
    { methd: "GET" }
  );

  const parsedResults = await results.json();
  previousGenre = parsedResults.genre;
  document.querySelector("#userName").value = parsedResults.userName;
  document.querySelector("#userEmail").value = parsedResults.userEmail;
  document.querySelector("#bookName").value = parsedResults.bookName;
  document.querySelector("#authorName").value = parsedResults.authorName;
  document.querySelector(
    `#${genreOptions[parsedResults.genre]}`
  ).selected = true;
  document.querySelector(
    `#${ratingOptions[parsedResults.rating]}`
  ).checked = true;
  document.querySelector("#userReview").textContent = parsedResults.userReview;
}

updateForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  unsuccessfulAlert.style.display = "none";
  const updateFormData = new FormData(updateForm);
  const results = await fetch(`${window.location.pathname}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: updateFormData.get("userName"),
      userEmail: updateFormData.get("userEmail"),
      bookName: updateFormData.get("bookName"),
      authorName: updateFormData.get("authorName"),
      genre: updateFormData.get("bookGenre"),
      rating: updateFormData.get("rating"),
      userReview: updateFormData.get("userReview"),
      oldGenre: previousGenre,
    }),
  });
  const succesfulDatabaseTransaction = await results.json();
  if (succesfulDatabaseTransaction) {
    window.location.replace(
      `/review/${window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      )}`
    );
  } else {
    unsuccessfulAlert.style.display = "block";
  }
});

getOriginalReviewData();
