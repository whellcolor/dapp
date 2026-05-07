export default function NFTGallery() {

  const dummyNFTs = [
    {
      id: 1,
      image: "https://picsum.photos/300?1",
      name: "Agara NFT #1"
    },
    {
      id: 2,
      image: "https://picsum.photos/300?2",
      name: "Agara NFT #2"
    },
    {
      id: 3,
      image: "https://picsum.photos/300?3",
      name: "Agara NFT #3"
    },
  ];

  return (
    <div>

      <h2 className="text-3xl mb-6">
        NFT Gallery
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {dummyNFTs.map((nft) => (
          <div
            key={nft.id}
            className="bg-slate-800 rounded-2xl overflow-hidden hover:scale-105 transition"
          >

            <img
              src={nft.image}
              className="w-full h-72 object-cover"
            />

            <div className="p-4">
              <h3 className="text-xl">
                {nft.name}
              </h3>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
