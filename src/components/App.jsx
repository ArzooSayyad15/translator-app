import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("hi");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const response = await fetch(
        "https://text-translator2.p.rapidapi.com/translate",
        {
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
            "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
          },
          body: new URLSearchParams({
            source_language: "en",
            target_language: language,
            text: text,
          }),
        }
      );

      const data = await response.json();
      setResult(data?.data?.translatedText || "");
    } catch {
      setResult("Translation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      
      {/* CARD */}
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">

        {/* BLURRED IMAGE BACKGROUND */}
        <div className="absolute inset-0 card-bg"></div>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="relative p-6 text-white">

          {/* HEADING */}
          <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wide
          text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
            Text Translator 🌍
          </h1>

          {/* INPUT SECTION (MORE NARROW) */}
          <div className="space-y-3">
            <textarea
              className="block mx-auto w-[70%] bg-black/40 border border-gray-500
              p-4 rounded-lg text-white text-lg
              placeholder-gray-300 focus:outline-none"
              rows="4"
              placeholder="Enter text in English"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <select
              className="block mx-auto w-[70%] bg-black/40 border border-gray-500
              p-3 rounded-lg text-white focus:outline-none"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          {/* TRANSLATE BUTTON (SEPARATE & FULL STYLE) */}
         <button
  onClick={translateText}
  disabled={loading}
  className={`mt-6 w-full py-3 rounded-xl
  text-lg font-semibold text-white
  border border-white/40
  transition-all duration-300
  ${
    loading
      ? "bg-black/70 cursor-not-allowed"
      : "bg-black hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] hover:border-white"
  }`}
>
  {loading ? "Translating..." : "Translate"}
</button>

          {/* RESULT (SAME WIDTH AS INPUTS) */}
          {result && (
            <div className="mt-4 block mx-auto w-[70%]
            p-3 bg-black/40 rounded-lg
            text-green-300 text-lg">
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
