export default function AuthSplitLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT PANEL */}
      <div className="hidden md:flex flex-col justify-center px-14
        bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500
        text-white relative overflow-hidden">

        <h1 className="text-4xl font-bold mb-4">
          Welcome to Interview Platform
        </h1>

        <p className="text-lg text-indigo-100 max-w-md">
          Schedule interviews, manage availability, and collect structured
          feedback — all in one place.
        </p>

        {/* Decorative shapes */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-24 right-16 w-40 h-40 bg-pink-400/30 rounded-full blur-2xl" />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-1">{title}</h2>
          <p className="text-gray-500 mb-6">{subtitle}</p>
          {children}
        </div>
      </div>

    </div>
  );
}
