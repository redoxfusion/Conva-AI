import AnnotationGenerator from "./_components/AnnotationGenerator";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white text-center py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Annotation Generator</h1>
          <p className="text-lg sm:text-xl mb-8">
            Upload your documents and generate annotations, summaries, highlights, or key points with ease.
          </p>
          <a
            href="#annotation-section"
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-200 transition duration-300"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white text-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Document Upload</h3>
              <p className="text-gray-700">
                Easily upload any document, and our AI will process it for you.
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Annotation Generation</h3>
              <p className="text-gray-700">
                Get accurate annotations, summaries, or highlights from your document.
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Multiple Formats</h3>
              <p className="text-gray-700">
                Supports various document formats like PDF, Word, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Annotation Generator Form Section */}
      <section id="annotation-section" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Generate Annotations</h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
            <AnnotationGenerator />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
      </footer>
    </div>
  );
};

export default Home;

