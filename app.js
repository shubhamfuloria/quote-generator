const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//show new quote
function newQuote() {
  showLoadingSpinner();
  //pick a random quote from API
  const randomIndex = Math.floor(Math.random() * 1643);
  const quote = apiQuotes[randomIndex];
  quoteText.textContent = quote.text;
  authorText.textContent = quote.author === null ? "unknown" : quote.author;

  // decrease font big when length of quote is larger
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  removeLoadingSpinner();
}

// GET QUOTES from API
async function getQuotes() {
  console.log("Running")
  const apiUrl = "https://type.fit/api/quotes";
  showLoadingSpinner();
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch {
    //Catch Errors
  }
}

//tweet
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteText.textContent}`;
  window.open(twitterUrl, "_blank ");
}

//event listeners
newQuoteBtn.onclick = newQuote;
twitterBtn.onclick = tweetQuote;


//initialize 
window.onload = getQuotes;
