function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-xl p-8 m-6 text-center shadow-lg">

      {/* Location */}
      <h2 className="text-3xl font-bold">
        Addis Ababa
      </h2>

      <p className="text-lg">
        Ethiopia
      </p>


      {/* Weather */}
      <div className="mt-6">
        <div className="text-6xl">
          ☀️
        </div>

        <h1 className="text-5xl font-bold mt-3">
          24°C
        </h1>

        <p className="text-2xl">
          Sunny
        </p>
      </div>


      {/* Details */}
      <div className="grid grid-cols-3 gap-4 mt-8">

        <div className="bg-white/20 rounded-lg p-4">
          <p>💧 Humidity</p>
          <h3 className="font-bold">
            45%
          </h3>
        </div>


        <div className="bg-white/20 rounded-lg p-4">
          <p>🌬 Wind</p>
          <h3 className="font-bold">
            12 km/h
          </h3>
        </div>


        <div className="bg-white/20 rounded-lg p-4">
          <p>Pressure</p>
          <h3 className="font-bold">
            1015 hPa
          </h3>
        </div>

      </div>


      {/* Forecast */}
      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-5">
          Today Forecast
        </h2>


        <div className="grid grid-cols-5 gap-4">

          {[
            ["🌞","Mon","24°C"],
            ["☁️","Tue","22°C"],
            ["🌧️","Wed","20°C"],
            ["🌤️","Thu","25°C"],
            ["🌙","Fri","18°C"],
          ].map((day,index)=>(
            <div
              key={index}
              className="bg-white/20 rounded-lg p-4"
            >
              <div className="text-3xl">
                {day[0]}
              </div>

              <p>{day[1]}</p>

              <p className="font-bold">
                {day[2]}
              </p>

            </div>
          ))}

        </div>

      </div>


      {/* Weather Details */}
      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-5">
          Weather Details
        </h2>


        <div className="grid grid-cols-2 gap-4">

          <div className="bg-white/20 p-4 rounded-lg">
            💧 Humidity
            <p className="font-bold">
              45%
            </p>
          </div>


          <div className="bg-white/20 p-4 rounded-lg">
            🌬 Wind
            <p className="font-bold">
              12 km/h
            </p>
          </div>


          <div className="bg-white/20 p-4 rounded-lg">
            👁 Visibility
            <p className="font-bold">
              10 km
            </p>
          </div>


          <div className="bg-white/20 p-4 rounded-lg">
            🌡 Feels Like
            <p className="font-bold">
              25°C
            </p>
          </div>

        </div>

      </div>


    </section>
  );
}

export default Hero;