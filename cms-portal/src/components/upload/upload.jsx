import Link from "next/link";

export default function UploadPage() {
  return (
    <div className="flex h-screen bg-cover bg-center" style={{ backgroundImage: "url('/image.jpg')" }}>
      
      <div className="w-72 bg-[#78C1F3] text-white p-6 shadow-xl bg-opacity-90">
        <h2 className="text-2xl font-extrabold mb-6 text-[#9BE8D8]">Upload Options</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/upload/imageUpload">
              <button className="w-full text-left p-4 text-lg font-semibold rounded bg-[#E2F6CA] hover:bg-[#F8FDCF] text-[#14274E] transition duration-300">
                Upload Image
              </button>
            </Link>
          </li>
          <li>
            <Link href="/upload/videoUpload">
              <button className="w-full text-left p-4 text-lg font-semibold rounded bg-[#E2F6CA] hover:bg-[#F8FDCF] text-[#14274E] transition duration-300">
                Upload Video
              </button>
            </Link>
          </li>
          <li>
            <Link href="/upload/newsletterUpload">
              <button className="w-full text-left p-4 text-lg font-semibold rounded bg-[#E2F6CA] hover:bg-[#F8FDCF] text-[#14274E] transition duration-300">
                Upload Newsletter
              </button>
            </Link>
          </li>
        </ul>
        
        <div className="mt-8">
          <Link href="/">
            <button className="w-full text-left p-4 text-lg font-semibold rounded bg-[#9BE8D8] hover:bg-[#78C1F3] text-[#14274E] transition duration-300">
              Logout
            </button>
          </Link>
        </div>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-extrabold text-[#9BE8D8]">Dashboard</h1>
      </div>
    </div>
  );
}
