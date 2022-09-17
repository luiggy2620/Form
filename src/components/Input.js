import React from "react";
import {Label, ContenedorInput, GrupoInput, Input, LeyendaError, IconoValidacion} from './../elements/Formularios'
import { faCircleCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const ComponenteInput = ({estado, cambiarEstado, tipo, label, placeholder, nombre, leyendaError, expresionRegular, funcion}) => {
    const onChange = (evento) => {
        cambiarEstado({...estado, campo: evento.target.value});
    }

    const validacion = () => {
        if(expresionRegular) {
            if(expresionRegular.test(estado.campo)) {
                cambiarEstado({...estado, valido: 'true'})
            } else {
                cambiarEstado({...estado, valido: 'false'})
            }
        }

        if(funcion) {
            funcion();
        }
    }
    
    return ( 
        <ContenedorInput>
            <Label htmlFor={nombre} valido={estado.valido}>{label}</Label>
            <GrupoInput>
                <Input 
                    type={tipo} 
                    placeholder={placeholder} 
                    id={nombre}
                    value={estado.campo}
                    onChange={onChange}
                    onKeyUp={validacion}
                    onBlur={validacion}
                    valido={estado.valido}
                />

                <IconoValidacion 
                    icon={estado.valido === 'true' ? faCircleCheck : faTimesCircle} 
                    valido={estado.valido}
                />
            </GrupoInput>
            <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
        </ContenedorInput>
     );
}
 

export default ComponenteInput;