import React, {useState} from "react";
import {
    Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, 
    MensajeExito, MensajeError
} from './elements/Formularios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import ComponenteInput from "./components/Input";


const App = () => {
    const [usuario, cambiarUsuario] = useState({ campo: '', valido: null });
    const [nombre, cambiarNombre] = useState({ campo: '', valido: null });
    const [password, cambiarPassword] = useState({ campo: '', valido: null });
    const [password2, cambiarPassword2] = useState({ campo: '', valido: null });
    const [correo, cambiarCorreo] = useState({ campo: '', valido: null });
    const [telefono, cambiarTelefono] = useState({ campo: '', valido: null });
    const [terminos, cambiarTerminos] = useState(false);
    const [formularioValido, cambiarFormularioValido] = useState(null);

    const expresiones = {
        usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,12}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    }

    const validarPassword2 = () => {
        if(password.campo.length > 0) {
            if(password.campo !== password2.campo) {
                cambiarPassword2((prevState) => {
                    return{...prevState, valido:'false'}
                })
            } else {
                cambiarPassword2((prevState) => {
                    return{...prevState, valido:'true'}
                })
            }
        }
    }

    const onChangeTerminos = (evento) => {
        cambiarTerminos(evento.target.checked);
    }

    const onSubmit = (evento) => {
        evento.preventDefault();
        if(
            usuario.valido === 'true' &&
            nombre.valido === 'true' &&
            password.valido === 'true' &&
            password2.valido === 'true' &&
            correo.valido === 'true' &&
            telefono.valido === 'true' &&
            terminos
        ) {
            cambiarFormularioValido(true);
            restartFormulario();
        } else {
            cambiarFormularioValido(false);
        }
    }

    function restartFormulario() {
        cambiarUsuario({campo: '', valido: null});
        cambiarNombre({campo: '', valido: null});
        cambiarPassword({campo: '', valido: null});
        cambiarPassword2({campo: '', valido: null});
        cambiarCorreo({campo: '', valido: null});
        cambiarTelefono({campo: '', valido: null});
        cambiarTerminos(false)
        
    }

    return ( 
        <main>
            <Formulario action="" onSubmit={onSubmit}>
                <ComponenteInput 
                    estado={usuario}                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                    cambiarEstado={cambiarUsuario}
                    tipo="text"
                    label="User"
                    placeholder="User_123"
                    name="usuario"
                    leyendaError="The name must have 4 to 16 digits and can only contain letters, numbers and underscore."
                    expresionRegular={expresiones.usuario}
                />

                <ComponenteInput 
                    estado={nombre}
                    cambiarEstado={cambiarNombre}
                    tipo="text"
                    label="Name"
                    placeholder="User name"
                    name="usuario"
                    leyendaError="The name can only have letters and space."
                    expresionRegular={expresiones.nombre}
                />

                <ComponenteInput 
                    estado={correo}
                    cambiarEstado={cambiarCorreo}
                    tipo="email"
                    label="Email"
                    placeholder="user@gmail.com"
                    name="correo"
                    leyendaError="The mail contain letters, numbers and periods."
                    expresionRegular={expresiones.correo}
                />

                <ComponenteInput 
                    estado={telefono}
                    cambiarEstado={cambiarTelefono}
                    tipo="text"
                    label="Phone Number"
                    placeholder="12345678"
                    name="telefono"
                    leyendaError="The phone number can only have numbers and 7 to 14 digits."
                    expresionRegular={expresiones.telefono}
                />

                <ComponenteInput 
                    estado={password}
                    cambiarEstado={cambiarPassword}
                    tipo="password"
                    label="Password"
                    placeholder="yourpasswd"
                    name="password1"
                    leyendaError="The password must have 4 to 16 digits."
                    expresionRegular={expresiones.password}
                />

                <ComponenteInput 
                    estado={password2}
                    cambiarEstado={cambiarPassword2}
                    tipo="password"
                    label="Repeat tour password"
                    placeholder="yourpasswd"
                    name="password2"
                    leyendaError="Both passwords must be the same."
                    funcion={validarPassword2}
                />

                <ContenedorTerminos>
                    <Label>
                        <input 
                            type="checkbox" 
                            name="terminos" 
                            id="terminos" 
                            checked={terminos}
                            onChange={onChangeTerminos}
                        />
                        Acepto los terminos y condiciones
                    </Label>
                </ContenedorTerminos>

                {formularioValido === false && <MensajeError>
                    <p>
                        <FontAwesomeIcon icon={faCircleXmark}/>
                        <b>Error:</b> Por favor rellena el formulario correctamente.
                    </p>
                </MensajeError>}

                <ContenedorBotonCentrado>
                    <Boton type="submit" >Enviar</Boton>
                    {formularioValido === true && <MensajeExito>El formulario se envio exitosamente</MensajeExito>}
                </ContenedorBotonCentrado>
            </Formulario>
        </main>
     );
}

export default App;