

import React, { useRef, useState } from "react";
import axios from "axios";
import { URL } from "./backendurl";
import { QRCodeCanvas } from "qrcode.react";

export function Dashboard() {
  const [longUrl, setLongUrl] = useState("");
  const [shortLink, setShortLink] = useState("");

  const [domain] = useState("bit.ly");
  const [createdAt, setCreatedAt] = useState("");
  const qrRef = useRef(null);

  //this function is used to download the QR code as an image
  const handleDownloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;   downloadLink.download = "qr-code.png";
    downloadLink.click();
  };

   const handleGenerate = async () => {
    if (!longUrl) return alert("Please enter a URL.");
    try {
      const response = await axios.post(`${URL}/shorturl`, {
        long_url: longUrl,
        domain,
      });
      if (response.status === 200) {
        setShortLink(response.data.link);
           setCreatedAt(response.data.created_at);
      } else {
        alert("Error generating short link.");
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
   }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex justify-center items-center px-4 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-8">
          🔗 Shorten Your URL
        </h1>

        <div className="space-y-6">
         <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Long URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/long-url"
         className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={longUrl}
               onChange={(e) => setLongUrl(e.target.value)}
              required/>
          </div>

            <button
            onClick={handleGenerate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200" >
            ✨ Generate Short Link
          </button>
        </div>

        {shortLink && (
          <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-700 mb-2">✅ Your Short Link</h2>
            <a
              href={shortLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-words">
              {shortLink}
            </a>

            <div
              ref={qrRef}
              className="mt-6 flex flex-col items-center space-y-3">
    <QRCodeCanvas value={shortLink} size={180} />
    {/* this button call that function handleDownloadQR  */}
              <button
                onClick={handleDownloadQR}
                className="bg-green-600 text-white px-5 py-1.5 rounded hover:bg-green-700 transition">
                   ⬇️ Download QR Code
              </button>
              <p className="text-sm text-gray-600 italic pt-2">
          📅 Created on:{" "}
                <span className="font-semibold text-gray-800">
                  {createdAt}
                </span>
              </p>
            </div> </div>
        )}
      </div>
    </div>
  );
}
