import { Link } from "react-router";

const List = ({ data }) => {
  return (
    <div className="p-4 rounded-lg border ">
      {/* Header Row */}
      <div className="w-full grid grid-cols-4 bg-gray-200 p-3 rounded-t-lg text-center font-semibold">
        <h2 className="text-lg">Title</h2>
        <p className="text-lg">Mood</p>
        <p className="text-lg">Date</p>
        <p className="text-lg">Action</p>
      </div>

      {/* Data Rows */}
      <div className="w-full rounded-b-lg">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-full grid grid-cols-4 bg-gray-100 p-3  text-center items-center"
          >
            <h2 className="truncate min-w-0">{item.title}</h2>
            <p className="truncate min-w-0">{item.mood}</p>
            <p className="text-sm truncate min-w-0">
              {new Date(item.date).toLocaleDateString()}
            </p>
            <Link
              target="_blank"
              to={`/user/entry/${item._id}`}
              className="text-blue-500 hover:underline"
            >
              Read
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
