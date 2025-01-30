export default function Footer() {
  return (
    <footer className="bg-blue-300 py-4 absolute left-0 right-0 bottom-0 ">
      <div className="container">
        <h2 className="mb-2 font-bold">Get The FreshCart App</h2>

        <div className="flex gap-4">
          <input
            type="text"
            className="form-inbut flex-grow"
            placeholder="Email ... "
          />
          <button className="btn">Share App Link</button>
        </div>

        <p className="text-center mt-5">Follow us on social media</p>
        <p className="text-center">
          &copy; 2021 FreshCart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
