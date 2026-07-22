function Header() {
  return (
    <header className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold flex items-center gap-2">
        ☁ WeatherApp
      </h1>

      {/* Search */}
      <div className="flex items-center bg-white rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search City"
          className="px-4 py-2 text-gray-700 outline-none"
        />

        <button className="bg-blue-500 px-4 py-2 hover:bg-blue-700">
          🔍
        </button>
      </div>
    </header>
  );
}

export default Header;