import { useState } from "react";
import { upload } from "thirdweb/storage";
import { client } from "../client";

export default function MintNFT() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function uploadToIPFS() {

    if (!file) return;

    setLoading(true);

    try {

      // upload image
      const imageUri = await upload({
        client,
        files: [file],
      });

      // metadata OpenSea compatible
      const metadata = {
        name: "Agara NFT",
        description: "Modern NFT",
        image: imageUri,
      };

      const metadataUri = await upload({
        client,
        files: [
          new File(
            [JSON.stringify(metadata)],
            "metadata.json"
          )
        ]
      });

      console.log(metadataUri);

      alert("Metadata uploaded!");

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div className="bg-slate-800 p-6 rounded-2xl mb-10">

      <h2 className="text-2xl mb-4">
        Mint NFT
      </h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadToIPFS}
        className="bg-blue-500 px-4 py-2 rounded-xl ml-4"
      >
        {loading ? "Uploading..." : "Upload NFT"}
      </button>
    </div>
  );
}
