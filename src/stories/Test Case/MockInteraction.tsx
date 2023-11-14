import React, { useState } from "react";
import { Button } from "../Button";
import axios from "axios";

type MockApiResult = {
  id: number;
  text: string;
};

function MockInteraction() {
  const [changesText, setChangesText] = useState(0);
  const [results, setResults] = React.useState<MockApiResult[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const handleNextButton = () => {
    if (changesText < 3) {
      setChangesText(changesText + 1);
    } else {
      setChangesText(changesText);
    }
  };

  const fetchResults = React.useCallback(async () => {
    setLoading(true);

    const response = await axios.get("/api/test/");

    if (response.status === 200) {
      const data = await response.data;
      console.log(response.data);
      setResults(data.results);
      setLoading(false);
    } else {
      setError(
        `Something went wrong with the request. Status: ${response.status}`
      );
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchResults();
  }, []);
  return (
    <>
      {error && !loading && (
        <div data-testid="error-section">
          <h5 data-testid={`text-error`}>{error}</h5>
        </div>
      )}
      {loading && <div data-testid="loading-section">This is Loading</div>}
      {!error && !loading && (
        <div data-testid="success-section">
          <h5 data-testid={`text-alert-${results[changesText]?.id}`}>
            {results && results[changesText]?.text}
          </h5>

          <Button
            data-testid="btn-next"
            primary
            label="Next"
            onClick={handleNextButton}
          />
        </div>
      )}
    </>
  );
}

export default MockInteraction;
