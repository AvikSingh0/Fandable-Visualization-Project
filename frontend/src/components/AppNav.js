import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-bootstrap';
/* eslint-disable no-restricted-globals */

export function AppNav(props) {

    function handleGroupClick(group) {
        // Call the callback function passed as a prop
        props.onGroupClick(group);
    }

    return (

        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>
                    Affordable Childcare
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="coll-navbar-nav" aria-expanded="false" aria-label="Toggle navigation"/>
                <Navbar.Collapse id="coll-navbar-nav">

                    <Nav varient="tabs" defaultActiveKey="/chart" className="me-auto">
                        <NavLink href="/chart" eventKey="chart" aria-current={location.pathname === "/chart" ? "page": undefined}>
                            Relevant Keywords
                        </NavLink>
                        <NavLink href="/table" eventKey="table" aria-current={location.pathname === "/table" ? "page" : undefined}>
                            Detailed Data
                        </NavLink>
                        <NavDropdown title="Filter by Time" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => handleGroupClick("hour")}>Last Hour</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleGroupClick("day")}>Today</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleGroupClick("week")}>This Week</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleGroupClick("month")}>This Month</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleGroupClick("year")}>This Year</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleGroupClick("all")}>All Time</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
