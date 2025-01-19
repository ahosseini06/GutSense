import { useNavigate } from 'react-router-dom';

export default function PastResults() {
    const pastResults = localStorage.getItem("past-results") ? JSON.parse(localStorage.getItem("past-results")) : null;
    const navigate = useNavigate();

    return (
        <>
            {pastResults && pastResults[0] && pastResults.map((result, i) => <button
                onClick={
                    () => navigate("/diagnosis", { state: result })
                }
                key={i}
                style={{ display: "block" }}
            >
                <h2>Result {i + 1}</h2>
                <p>{result.data.condition_category}</p>
            </button >)}
            {!pastResults[0] && <h2>No past results found.</h2>}
        </>
    )
}