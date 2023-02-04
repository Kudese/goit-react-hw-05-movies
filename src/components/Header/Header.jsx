import { NavLink } from 'react-router-dom';
import s from '../Header/Header.module.css'

export default function Header() {
  return (
    <header className={s.header}>
      
        <NavLink to="" className={s.button}>Home</NavLink>
        <NavLink to="movie" className={s.button}>Movies</NavLink>
      
    </header>
  );
}
