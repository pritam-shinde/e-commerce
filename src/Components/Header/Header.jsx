import { NavLink, useLocation } from "react-router-dom";
import { Icon, Button, Box, IconButton, Badge } from "@mui/material";
import { Menu, Search, ShoppingBag } from "@mui/icons-material";
import { SiNike } from 'react-icons/si';
import { Link } from "react-router-dom";
import './sass/header.css';

const Header = ({ cart }) => {
  const location = useLocation();

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      document.querySelector('header').classList.add('stickyHeader');
    } else {
      document.querySelector('header').classList.remove('stickyHeader');
    }
  })

  return (
    <>
      <header className="fixed-top">
        <nav className={`navbar navbar-expand-lg navbar-dark  px-2 ${location.pathname !== "/" ? "bg-dark" : "bg-transparent"}`}>
          <NavLink to="/" className="navbar-brand text-white"><Icon><SiNike /></Icon></NavLink>
          <Box className="collapse navbar-collapse" id="menu">
            <ul className="navbar-nav">
              {
                [{ id: 'menu-item1', text: "Mens", link: "/category/men/" }, { id: 'menu-item2', text: "Women", link: "/category/women/" }, { id: 'menu-item3', text: "Kids", link: "/category/kids/" }, { id: 'menu-item4', text: "New Arrival", link: "/category/new-arrival/" }].map(item => {
                  return <li key={item.id} className="nav-item">
                    <NavLink className="nav-link text-white" to={item.link}>
                      {item.text}
                    </NavLink>
                  </li>
                })
              }
            </ul>
          </Box>
          <Box style={{ flexGrow: 0 }} />
          <Box id="header_right_icon">
            <IconButton className="mx-md-2 mx-1"><Search /></IconButton>
            <IconButton className="mx-md-2 mx-1"><Link to="/cart/"><Badge color="secondary" badgeContent={cart ? cart.line_items ? cart.line_items.length : 0 : 0}><ShoppingBag /></Badge></Link></IconButton>
          </Box>
          <Button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
            <Icon>
              <Menu />
            </Icon>
          </Button>
        </nav>
      </header>
    </>
  )
}

export default Header