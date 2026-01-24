export default function Timeline() {
  const estudios = [
    { año: "2025", titulo: "Curso React Avanzado", institucion: "Platzi" },
    { año: "2023", titulo: "Licenciatura en Informática", institucion: "UBA" },
    { año: "2020", titulo: "Desarrollo Web Fullstack", institucion: "Coderhouse" },
  ];

  return (
    <div className="flex flex-col md:flex-row md:space-x-6 max-w-4xl mx-auto p-6">
      <div className="relative md:w-1/3">
        <div className="absolute h-full border-l-2 border-gray-300 left-5 md:left-auto md:right-1/2 md:border-t-0 md:border-l-2"></div>
      </div>

      <div className="flex-1">
        {estudios.map((item, index) => (
          <div key={index} className="mb-8 flex items-start md:items-center md:space-x-6">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full flex-shrink-0">
              {item.año}
            </div>
            <div className="mt-2 md:mt-0">
              <h3 className="text-lg font-semibold">{item.titulo}</h3>
              <p className="text-gray-600">{item.institucion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}