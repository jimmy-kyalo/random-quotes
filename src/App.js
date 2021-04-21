import "./App.css";
import { useEffect, useState } from "react";
import { random } from "lodash";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button, IconButton } from "@material-ui/core";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"
      );
      const quotes = await data.json();

      setQuotes(quotes);
      setIndex(random(0, quotes.length - 1));
    }
    fetchData();
  }, []);

  function getSelectedQuote() {
    if (!quotes.length || !Number.isInteger(index)) {
      return undefined;
    }
    return quotes[index];
  }

  /**
   * Returns an integer representing an index in state.quotes
   * If state.quotes is empty, returns undefined
   */
  function generateNewQuoteIndex() {
    if (!quotes.length) {
      return undefined;
    }
    return random(0, quotes.length - 1);
  }

  function assignNewQuoteIndex() {
    setIndex(generateNewQuoteIndex());
  }

  const QuoteMachine = ({ selectedQuote, assignNewQuoteIndex }) => {
    return (
      <div>
        <div className="quote-box" id="quote-box">
          <h4 className="quote" id="text">
            {selectedQuote.quote}
          </h4>
          <p className="author" id="author">
            ~ {selectedQuote.author}
          </p>
          <div className="footer">
            <IconButton
              id="tweet-quote"
              className="primary"
              href={encodeURI(
                `https://twitter.com/intent/tweet?text=${selectedQuote.quote}&hashtags=thewebdevcoach`
              )}
              target="_blank">
              <TwitterIcon />
            </IconButton>
            <Button
              className="new-quote"
              id="new-quote"
              onClick={assignNewQuoteIndex}>
              <h5>New Quote</h5>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {getSelectedQuote() ? (
        <QuoteMachine
          selectedQuote={getSelectedQuote()}
          assignNewQuoteIndex={assignNewQuoteIndex}
        />
      ) : null}
    </div>
  );
}

export default App;
