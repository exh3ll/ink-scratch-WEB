// app/(public)/about/page.tsx
import Link from "next/link";
import Header from "../_components/Header"; // Reuse the same header

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Padding for fixed header */}
      <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="px-6 py-16 max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="logo-gradient">About Ink Scratch</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-primary max-w-3xl mx-auto">
              The modern way to read mangas, comics, and novels — instantly, anywhere.
            </p>
          </div>

          {/* Mission Statement */}
          <section className="bg-white rounded-3xl shadow-xl p-10 md:p-16 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed text-center max-w-4xl mx-auto">
              At <span className="font-bold text-orange">Ink Scratch</span>, we believe reading should be seamless and joyful. 
              Inspired by the immediacy of streaming services like Netflix and Spotify, we created a platform that brings the same effortless experience to digital literature.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed mt-6 text-center max-w-4xl mx-auto">
              No more managing files, corrupted downloads, or clunky apps. Just open your browser, pick a story, and dive in — with your progress synced across all your devices in the cloud.
            </p>
          </section>

          {/* Features Grid */}
          <section className="grid md:grid-cols-3 gap-10 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-orange to-red rounded-full flex items-center justify-center">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Instant Access</h3>
              <p className="text-text-secondary">
                Start reading in seconds — no downloads or installations required.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-orange to-red rounded-full flex items-center justify-center">
                <span className="text-4xl">☁️</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Cloud Sync</h3>
              <p className="text-text-secondary">
                Your reading progress is saved automatically and available on any device.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-orange to-red rounded-full flex items-center justify-center">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Cross-Device</h3>
              <p className="text-text-secondary">
                Read on your phone, tablet, or computer — seamlessly switch anytime.
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center py-16">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Ready to start your next adventure?
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/register">
                <button className="btn-primary text-xl px-12 py-5">
                  Join Ink Scratch Free
                </button>
              </Link>
              <Link href="/">
                <button className="px-12 py-5 bg-white text-orange font-semibold rounded-2xl shadow-md hover:shadow-xl transition border border-divider">
                  Back to Home
                </button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}