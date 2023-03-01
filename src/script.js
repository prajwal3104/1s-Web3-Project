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

import * as fcl from "@onflow/fcl";

// Set up FCL config
fcl.config()
  .put("challenge.handshake", "https://flow-wallet-testnet.blocto.app/authn")
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("discovery.wallet", "https://flow-wallet-testnet.blocto.app");

// Mint an NFT
async function mintNFT(name, description, image) {
  try {
    // Authenticate user with Flow Wallet
    await fcl.authenticate();

    // Send transaction to mint NFT
    const txId = await fcl.send([
      fcl.transaction`
        import NonFungibleToken from 0x01cf0e2f2f715450
        import FungibleToken from 0x9a0766d93b6608b7
        import NFTStorefront from 0x01cf0e2f2f715450

        transaction(name: String, description: String, image: String) {
          let receiver: Address
          let nftProvider: &NonFungibleToken.Provider
          let storefrontProvider: &NFTStorefront.StorefrontProvider

          prepare(acct: AuthAccount) {
            self.receiver = acct.address
            self.nftProvider = acct.borrow<&NonFungibleToken.Provider>(from: /storage/NFTProvider)
            self.storefrontProvider = acct.borrow<&NFTStorefront.StorefrontProvider>(from: /storage/NFTStorefrontProvider)
          }

          execute {
            let metadata = {
              name: name,
              description: description,
              image: image
            }
            let nft <- self.nftProvider.mintNFT(recipient: self.receiver, metadata: metadata)

            self.storefrontProvider.addNFT(nft: <-nft)
          }
        }
      `,
      fcl.args([
        fcl.arg(name, fcl.String),
        fcl.arg(description, fcl.String),
        fcl.arg(image, fcl.String)
      ]),
      fcl.proposer(fcl.currentUser().authorization),
      fcl.authorizations([fcl.currentUser().authorization]),
      fcl.payer(fcl.currentUser().authorization),
      fcl.limit(100)
    ]).then(fcl.decode);

    console.log(`Transaction ID: ${txId}`);

    return txId;
  } catch (error) {
    console.error(error);
  }
}

// Call mintNFT function with form data
const mintForm = document.getElementById("mint-form");
mintForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  const name = document.getElementById("nft-name").value;
  const description = document.getElementById("nft-description").value;
  const image = document.getElementById("nft-image").value;

  const txId = await mintNFT(name, description, image);
  console.log(`Minted NFT with transaction ID: ${txId}`);
});


import * as fcl from "@onflow/fcl";

// Set up FCL config
fcl.config()
  .put("challenge.handshake", "https://flow-wallet-testnet.blocto.app/authn")
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("discovery.wallet", "https://flow-wallet-testnet.blocto.app");

// Mint an NFT
async function mintNFT(name, description, image) {
  try {
    // Authenticate user with Flow Wallet
    await fcl.authenticate();

    // Send transaction to mint NFT
    const txId = await fcl.send([
      fcl.transaction`
        import NonFungibleToken from 0x01cf0e2f2f715450
        import FungibleToken from 0x9a0766d93b6608b7
        import NFTStorefront from 0x01cf0e2f2f715450

        transaction(name: String, description: String, image: String) {
          let receiver: Address
          let nftProvider: &NonFungibleToken.Provider
          let storefrontProvider: &NFTStorefront.StorefrontProvider

          prepare(acct: AuthAccount) {
            self.receiver = acct.address
            self.nftProvider = acct.borrow<&NonFungibleToken.Provider>(from: /storage/NFTProvider)
            self.storefrontProvider = acct.borrow<&NFTStorefront.StorefrontProvider>(from: /storage/NFTStorefrontProvider)
          }

          execute {
            let metadata = {
              name: name,
              description: description,
              image: image
            }
            let nft <- self.nftProvider.mintNFT(recipient: self.receiver, metadata: metadata)

            self.storefrontProvider.addNFT(nft: <-nft)
          }
        }
      `,
      fcl.args([
        fcl.arg(name, fcl.String),
        fcl.arg(description, fcl.String),
        fcl.arg(image, fcl.String)
      ]),
      fcl.proposer(fcl.currentUser().authorization),
      fcl.authorizations([fcl.currentUser().authorization]),
      fcl.payer(fcl.currentUser().authorization),
      fcl.limit(100)
    ]).then(fcl.decode);

    console.log(`Transaction ID: ${txId}`);

    return txId;
  } catch (error) {
    console.error(error);
  }
}

// Call mintNFT function with form data
const mintForm = document.getElementById("mint-form");
mintForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  const name = document.getElementById("nft-name").value;
  const description = document.getElementById("nft-description").value;
  const image = document.getElementById("nft-image").value;

  const txId = await mintNFT(name, description, image);
  console.log(`Minted NFT with transaction ID: ${txId}`);
});

