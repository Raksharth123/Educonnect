/* eslint-disable react/prop-types */
const ClassCard = ({ classItem, onUpdate, onDelete, onSeeDetails }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <img
        src={classItem.image}
        alt={classItem.title}
        className="w-full h-32 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-bold">{classItem.title}</h2>
      <p className="text-sm text-gray-600">Name: {classItem.publisher.name}</p>
      <p className="text-sm text-gray-600">
        Email: {classItem.publisher.email}
      </p>
      <p className="text-sm text-gray-600">Price: ${classItem.price}</p>
      <p className="text-sm text-gray-600 mb-4">
        Description: {classItem.description}
      </p>
      <p
        className={`text-sm font-semibold mb-4 ${
          classItem.status === "approved" ? "text-green-500" : "text-yellow-500"
        }`}
      >
        Status: {classItem.status}
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        onClick={() => onUpdate(classItem)}
      >
        Update
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
        onClick={() => onDelete(classItem._id)}
      >
        Delete
      </button>
      <button
        className={`bg-green-500 text-white px-4 py-2 rounded-md ${
          classItem.status !== "approved" && "opacity-50 cursor-not-allowed"
        }`}
        disabled={classItem.status !== "approved"}
        onClick={() => onSeeDetails(classItem._id)}
      >
        See Details
      </button>
    </div>
  );
};

export default ClassCard;
