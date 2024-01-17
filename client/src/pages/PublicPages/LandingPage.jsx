import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <section className="flex flex-col items-center justify-center bg-zinc-800 text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center md:text-4xl xl:text-5xl mb-4">
        Explore the world of Authentication
      </h1>
      <div className="flex  items-center gap-4">
        <Link
          to="/login"
          type="button"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Sign up
        </Link>
      </div>
    </section>
  );
}

export default LandingPage;
