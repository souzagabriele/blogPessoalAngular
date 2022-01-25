import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario
  confirmarSenha : string
  tipoUser : string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any){
    console.log(event.target.value)
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.tipoUser = event.target.value
  }

cadastrar(){
  this.usuario.tipo = this.tipoUser

  console.log(`${this.usuario.senha} ${this.confirmarSenha}`)
  if(this.usuario.senha != this.confirmarSenha){
    alert('As senhas não coincidem.')
  } else {
    this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
      this.usuario = resp
      this.router.navigate(['/login'])
      alert('Usuário cadastrado!')
    })
  }

}

}
