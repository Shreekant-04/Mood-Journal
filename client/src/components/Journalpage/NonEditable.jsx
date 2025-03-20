const NonEditable = ({ data, highlightText }) => {
  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {data.title}
          </h2>
        </div>

        <p className="text-sm text-gray-500">
          {new Date(data.date).toLocaleString()}
        </p>
        <p className="text-md text-blue-500 font-semibold">Mood: {data.mood}</p>
        <hr className="my-4" />
        <div className="text-gray-700 whitespace-pre-line leading-relaxed">
          {data?.content?.split("\n").map((item, index) => (
            <p
              key={index}
              dangerouslySetInnerHTML={{ __html: highlightText(item) }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default NonEditable;
