import {Link} from "react-router-dom";

export default function Navbar() {
  return(
      <nav className="navbar navbar-dark bg-dark px-3">
        <Link classeName="navbar-brand" to="/">Book Management</Link>
        <div>
          <Link classeName="btn btn-sm btn-outline-light me-2" to="/books">Books</Link>"
          <Link classeName="btn btn-sm btn-outline-light me-2" to="/authors">Authors</Link>"
          <Link classeName="btn btn-sm btn-outline-light me-2" to="/subjects">Subjects</Link>"
          <Link classeName="btn btn-sm btn-outline-light me-2" to="/report">Report</Link>"
        </div>
      </nav>
  )
}