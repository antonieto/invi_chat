import React from 'react'

const Formulario = () => {
    return ( 
        <div> 
           
                <h2>Login </h2>
                <form>
                    <div class="form-group">
                        <label for="inputEmail">Email</label>
                        <input type="email" id="inputEmail" class="form-control" placeholder="Ingresa tu email" aria-describedby="emailHelp"/>
                        <small id="emailHelp" class="form-text text-muted">Help text</small>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword">Contraseña</label>
                        <input type="password" id="inputPassword" class="form-control" placeholder="Contraseña"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            
        </div>
      );
}

export default Formulario;