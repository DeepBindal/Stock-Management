export default function Navbar() {
    return (
      <>
        <div className="container mx-auto bg-blue-100 flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <i className="fa-solid fa-warehouse"></i>
            <span className="ml-3 text-xl">Stock Management</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900">Home</a>
            <a className="mr-5 hover:text-gray-900">About</a>
            <a className="mr-5 hover:text-gray-900">Contact Us</a>
          </nav>
        </div>
      </>
    );
  }
  