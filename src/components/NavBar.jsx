import classes from './css/NavBar.module.css'

function NavBar() {
  return (
    <nav className={classes.navbar}>
      <ul>
        <li><a href="/">NoobCode</a></li>
      </ul>
    </nav>
  )
}

export default NavBar