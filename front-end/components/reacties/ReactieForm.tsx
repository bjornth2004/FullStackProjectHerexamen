import React, { useState } from "react";

const ReactieForm = ({ onSubmit }) => {
  const [reactie, setReactie] = useState({
    titel: "",
    reviewtekst: "",
    score: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Converteer de score van een string naar een integer bij het veranderen voor het scoreveld
    const newValue = name === "score" ? parseInt(value, 10) || 0 : value;
    setReactie({ ...reactie, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reactie);
  };

  return (
    <div className="flex flex-col max-w-md mx-auto mt-4 p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="titel" className="text-lg font-semibold">
            Titel
          </label>
          <input
            type="text"
            id="titel"
            name="titel"
            value={reactie.titel}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="reviewtekst" className="text-lg font-semibold">
            Review Tekst
          </label>
          <textarea
            id="reviewtekst"
            name="reviewtekst"
            value={reactie.reviewtekst}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="score" className="text-lg font-semibold">
            Score
          </label>
          <input
            type="number"
            id="score"
            name="score"
            value={reactie.score.toString()}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
            min="1"
            max="5"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Verstuur
        </button>
      </form>
    </div>
  );
};

export default ReactieForm;
