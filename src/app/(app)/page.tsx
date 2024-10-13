import ShortenUrlForm from "@/components/shorten-url-form";

export default async function Home() {
  return (
    <div className="text-center">
      <h2 className="text-4xl text-gray-800 font-bold mb-1">
        Welcome to ShortPath
      </h2>
      <p className="text-sm text-indigo-500/90 mb-3 font-semibold italic">
        Shorten, Simplify, Share!
      </p>
      <p className="text-sm max-w-[700px] mx-auto text-gray-700">
        Do you have long, cluttered URLs that are hard to share or remember?
        ShortPath is your easy, fast, and reliable solution for creating clean,
        custom links. Whether you&apos;re sharing on social media, tracking
        campaigns, or just want to keep things simple, we&apos;ve got you
        covered.
      </p>
      <ShortenUrlForm />
    </div>
  );
}
