export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-yellow-500 uppercase tracking-widest mb-4">
            Contact Us
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            `{"Let's Get In Touch"}`
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            Have questions about products, orders, or partnerships? `{"We'd"}` love
            to hear from you. Send us a message and our team will get back to
            you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Get In Touch
            </h2>

            <p className="text-gray-400 mb-10">
              Feel free to contact us for any inquiries regarding products,
              orders, support, or collaborations.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-xl mb-2">Email</h3>
                <p className="text-gray-400">
                  support@example.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-2">Phone</h3>
                <p className="text-gray-400">
                  +91 98765 43210
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-2">Address</h3>
                <p className="text-gray-400">
                  Mumbai, Maharashtra, India
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Message
                </label>

                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}