const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from API
async function getQuote() {
  showLoadingSpinner();

  // Proxy URL to avoid CORs issues.
  const proxyUrl = "https://stark-wildwood-82750.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // If author is blank, set author to 'Unknown'
    authorText.innerText =
      data.quoteAuthor === "" ? "Unknown" : data.quoteAuthor;

    // Reduce font size for long quotes
    data.quoteText.length > 120
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");

    quoteText.innerText = data.quoteText;

    removeLoadingSpinner();
  } catch (error) {
    quoteText.innerText = "An error occurred. Please click New Quote button.";
    authorText.innerText = "";
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuote();
