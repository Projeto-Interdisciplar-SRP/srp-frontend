import "../../styles/header.css";

import logoSol from "../../img/Sun (1).png";

export default function Header({ which, page }) {

    switch (which) {

        case 'usuario':

            return (
                <nav>
                    <label className="logo">            
                        <div className="logo-form">
                            <img width={50} src={logoSol} alt="Profile"></img>
                        </div>
                    </label>
                    <input type="checkbox" id="check" />
                    <label for="check" className="checkbtn">
                        <i className="fa fa-bars"></i>
                    </label>
                    <ul>
                        <li><a className={page == 'inicio' ? 'active' : ''}>Inicio</a></li>
                        <li><a className={page == 'perfil' ? 'active' : ''}>Perfil</a></li>
                        <li><a className={page == 'sobre' ? 'active' : ''}>Sobre</a></li>
                    </ul>
                </nav>
            )

            break;

        case 'coordenador':
            return (
                <nav>
                    <label className="logo">            
                        <div className="logo-form">
                            <img width={50} src={logoSol} alt="Profile"></img>
                        </div>
                    </label>
                    <input type="checkbox" id="check" />
                    <label for="check" className="checkbtn">
                        <i className="fa fa-bars"></i>
                    </label>
                    <ul>
                        <li><a className={page == 'pessoas' ? 'active' : ''}>Pessoas</a></li>
                        <li><a className={page == 'reservas' ? 'active' : ''}>Reservas da Paroquia</a></li>
                        <li><a className={page == 'sobne' ? 'active' : ''}>Sobre</a></li>
                    </ul>
                </nav>
            )


            break;

        case 'secretaria':
            return (
                <nav>
                    <label className="logo">            
                        <div className="logo-form">
                            <img width={50} src={logoSol} alt="Profile"></img>
                        </div>
                    </label>
                    <input type="checkbox" id="check" />
                    <label for="check" className="checkbtn">
                        <i className="fa fa-bars"></i>
                    </label>
                    <ul>
                        <li><a className="active">Inicio</a></li>
                        <li><a>Perfil</a></li>
                        <li><a>Sobre</a></li>
                    </ul>
                </nav>
            )

            break;

        default:

            return (
                <nav>
                    <label className="logo">            
                        <div className="logo-form">
                            <img width={50} src={logoSol} alt="Profile"></img>
                        </div>
                    </label>
                    <input type="checkbox" id="check" />
                    <label for="check" className="checkbtn">
                        <i className="fa fa-bars"></i>
                    </label>
                    <ul>
                        <li><a className="active">Inicio</a></li>
                        <li><a>Perfil</a></li>
                        <li><a>Sobre</a></li>
                    </ul>
                </nav>
            )

            break;
    }

}