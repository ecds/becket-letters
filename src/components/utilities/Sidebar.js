import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


class Sidebar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Samuel Beckett Letters</Navbar.Brand>
        <Navbar.Brand id='beta-label'>BETA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="Browse Letters By" id="basic-nav-dropdown">
            <NavDropdown.Item href="/browse-letters-attendance">Attendance</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-music">Music</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-organization">Organization</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-person">Person</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-place">Place</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-production">Production</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-public-event">Public Event</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-publication">Publication</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-reading">Reading</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-Translating">Translating</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-work-of-art">Work of Art</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-writing">Writing</NavDropdown.Item>
            <NavDropdown.Item href="/browse-letters-repositories">Repository</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/timeline">Timeline</Nav.Link>
          <Nav.Link href='/filter-search'>Advanced Search</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(Sidebar);
