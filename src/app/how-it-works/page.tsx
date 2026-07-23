import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 font-montserrat">How It Works</h1>
          <p className="text-lg text-slate-600 mb-6 font-poppins">Recruma helps you create ATS-friendly resumes in minutes. Choose a template, fill in your details, use AI suggestions to improve your content, and download a PDF.</p>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold font-montserrat mb-2">1. Pick a template</h2>
              <p className="text-slate-600 font-poppins">Select from professionally designed templates tailored to different industries and roles.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold font-montserrat mb-2">2. Add your experience</h2>
              <p className="text-slate-600 font-poppins">Fill in your work history, education, skills, and a summary. Use our AI to generate or refine content.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold font-montserrat mb-2">3. Download and apply</h2>
              <p className="text-slate-600 font-poppins">Export a PDF optimized for ATS and start applying with confidence.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
