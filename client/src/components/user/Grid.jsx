import { Link } from "react-router";

const Grid = ({ data }) => {
  return (
    <div className="p-4 text-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
        {data.map((item, index) => (
          <div
            key={index}
            className="min-h-[25vmin] bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-center items-center"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-600">Mood: {item.mood}</p>
            <p className="text-gray-500 text-sm">
              Date: {new Date(item.date).toLocaleDateString()}
            </p>
            <Link
              to={`/user/entry/${item._id}`}
              target="_blank"
              className="mt-2 text-blue-500 hover:underline"
            >
              Read
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
