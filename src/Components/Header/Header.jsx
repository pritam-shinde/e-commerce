import { NavLink, useLocation} from "react-router-dom";
import { Icon, Button, Box, IconButton } from "@mui/material";
import { Menu, Search, ShoppingBag } from "@mui/icons-material";
import { SiNike } from 'react-icons/si';
import './sass/header.css'

const Header = () => {
  const location = useLocation()
  return (
    <>
      <header>
        <nav className={`navbar navbar-expand-lg navbar-dark  px-2 ${location.pathname !== "/" ? "bg-dark" : "bg-transparent" }`}>
          <NavLink to="/" className="navbar-brand text-white"><Icon><SiNike /></Icon></NavLink>
          <Box className="collapse navbar-collapse" id="menu">
            <ul className="navbar-nav">
              {
                [{ id: 'menu-item1', text: "Mens", link: "/category/men" }, { id: 'menu-item2', text: "Women", link: "/category/women" }, { id: 'menu-item3', text: "Kids", link: "/category/kids" }, { id: 'menu-item4', text: "New Arrival", link: "/category/new-arrival" }].map(item => {
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
            {
              [{ id: "header-icon1", icon: <Search /> }, { id: "header-icon2", icon: <ShoppingBag /> }].map(item => {
                return <IconButton key={item.id} className="mx-md-2 mx-1">{item.icon}</IconButton>
              })
            }
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