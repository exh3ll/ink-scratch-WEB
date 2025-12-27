// app/(app)/dashboard/page.tsx
import Header from "../../(public)/_components/Header"; // Path from (app) to (public)
import Link from "next/link";

export default function DashboardPage() {
  // Mock data - replace with real data from your backend later
  const continueReading = [
    { title: "One Piece", chapter: 1124, progress: 75 },
    { title: "Jujutsu Kaisen", chapter: 261, progress: 45 },
    { title: "Chainsaw Man", chapter: 170, progress: 90 },
  ];

  const myLibrary = [
    "Berserk",
    "Vinland Saga",
    "Attack on Titan",
    "Demon Slayer",
    "Solo Leveling",
    "My Hero Academia",
    "Tokyo Ghoul",
    "Naruto",
  ];

  return (
    <>
      {/* Reusable Header */}
      <Header />

      {/* Main Content with padding for fixed header */}
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="px-6 py-10 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2">
            Welcome back!
          </h1>
          <p className="text-xl text-text-secondary">
            Pick up right where you left off
          </p>

          {/* Continue Reading Section */}
          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-8">
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {continueReading.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  {/* Placeholder cover image */}
                  <div className="bg-gray-200 border-2 border-dashed rounded-t-2xl w-full h-64" />

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary mt-1">
                      Chapter {item.chapter}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-4 w-full bg-card rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-orange to-red h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-text-secondary mt-2">
                      {item.progress}% complete
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* My Library Section */}
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-8">
              My Library
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
              {myLibrary.map((title) => (
                <div
                  key={title}
                  className="group cursor-pointer text-center"
                >
                  {/* Placeholder cover */}
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full aspect-[3/4] group-hover:border-orange transition-all duration-200" />
                  <p className="mt-3 text-sm font-medium text-text-primary truncate">
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Browse More CTA */}
          <section className="mt-16 text-center">
            <Link href="/search">
              <button className="btn-primary text-lg px-12 py-5">
                Browse All Titles
              </button>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}