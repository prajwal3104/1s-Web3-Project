// Select the form and add an event listener for when it is submitted
const form = document.querySelector("#mint-form");
form.addEventListener("submit", async (event) => {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the form field values
  const nftName = form.elements["nft-name"].value;
  const nftDescription = form.elements["nft-description"].value;
  const nftImage = form.elements["nft-image"].value;

  // Validate the form fields
  if (!nftName || !nftImage) {
    alert("Please fill in all required fields.");
    return;
  }

  // Show a loading spinner
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  form.appendChild(spinner);

  // Mint the NFT
  try {
    const result = await flow.mintNFT(nftName, nftDescription, nftImage);
    console.log("Minting successful:", result);

    // Display a success message
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.textContent = "NFT minted successfully!";
    form.appendChild(successMessage);

    // Clear the form fields
    form.reset();
  } catch (error) {
    console.error("Minting failed:", error);

    // Display an error message
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = "NFT minting failed. Please try again.";
    form.appendChild(errorMessage);
  } finally {
    // Remove the loading spinner after the transaction is complete
    spinner.remove();
  }
});
