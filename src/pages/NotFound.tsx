const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          <img src="/404img.png" alt="404image" />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
