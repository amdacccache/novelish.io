const updateForm = document.querySelector("#updateReviewForm");
updateForm.addEventListener("submit", function () {
  const updateFormData = new FormData(updateForm);
  fetch(`${window.location.href}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: updateFormData.get("userName"),
      userEmail: updateFormData.get("userEmail"),
      bookName: updateFormData.get("bookName"),
      genre: updateFormData.get("bookGenre"),
      userReview: updateFormData.get("userReview"),
    }),
  });
});
