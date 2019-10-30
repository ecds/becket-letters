import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';


class Sidebar extends Component {
  render() {
      return (
        <Navbar bg="light"expand="lg">
        <Navbar.Brand href="#home">Samuel Beckett Letters</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Browse Letters By"id="basic-nav-dropdown">
            <Link  to="/browse-letters-attendance" className="dropdown-item">Letters by Attendance</Link>
              <Link  to="/browse-letters-music" className="dropdown-item">Letters by Music</Link>
              <Link  to="/browse-letters-organizations" className="dropdown-item">Letters by Organizations</Link>
              <Link to='/browse-letters-people' className="dropdown-item">Letters by People</Link>
              <Link to='/browse-letters-places' className="dropdown-item">Letters by Places</Link>
              <Link  to="/browse-letters-productions" className="dropdown-item">Letters by Production</Link>
              <Link  to="/browse-letters-publications" className="dropdown-item">Letters by Publications</Link>
              <Link  to="/browse-letters-public_events" className="dropdown-item">Letters by Public Events</Link>
              <Link  to="/browse-letters-readings" className="dropdown-item">Letters by Reading</Link>
              <Link  to="/browse-letters-translations" className="dropdown-item">Letters by Translations</Link>
              <Link  to="/browse-letters-works_of_art" className="dropdown-item">Letters by Works of Art</Link>
              <Link  to="/browse-letters-writings" className="dropdown-item">Letters by Writings</Link>
            </NavDropdown>
          </Nav>
      </Navbar.Collapse>
    </Navbar>

      )
    }
  }

export default withRouter(Sidebar);
