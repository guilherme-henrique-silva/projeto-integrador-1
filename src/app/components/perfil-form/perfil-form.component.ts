import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './perfil-form.component.html',
  styleUrl: './perfil-form.component.css'
})
export class PerfilFormComponent implements OnInit, AfterViewInit {

  @Output() registerEvent = new EventEmitter<{ success: boolean; message: string }>();

  userId: string | null;
  userRole: string | null;

  nomeInput = '';
  telefoneInput = '';
  emailInput = '';
  passwordInput = '';
  roleRadio = '';
  crpInput = '';
  enderecoInput = '';
  cidadeInput = '';
  estadoSelect = '';
  CEPInput = '';
  checkboxInput = '';

  isCheckedPsicologo: boolean = false;

  estadosItems = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PB', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]

  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    role: new FormControl(),
    crp: new FormControl(),
    nome: new FormControl(),
    telefone: new FormControl(),
    endereco: new FormControl(),
    cidade: new FormControl(),
    estado: new FormControl(),
    cep: new FormControl()
  });

  dbData = {};

  constructor(private auth: AuthService, private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.userId = this.auth.getUserId();
    this.userRole = this.auth.getUserRole();
  }

  ngOnInit(): void {
    if (this.userId) {
      this.dbData = this.userService.getUserById(this.userId).subscribe({
        next: (data) => {
          this.dbData = data;

          const enderecoList = data.endereco.split(",").map(function(item: string) {
            return item.trim();
          });

          this.form = this.fb.group({
            username: [data.username],
            password: [data.password],
            role: [data.role],
            crp: [data.crp],
            nome: [data.nome],
            telefone: [data.telefone],
            endereco: [enderecoList[0]],
            cidade: [enderecoList[1]],
            estado: [enderecoList[2]],
            cep: [enderecoList[3]]
          });

          this.onChange();

          this.emailInput = data.username;
          this.passwordInput = data.password;
          this.roleRadio = data.role;
          this.crpInput = data.crp;
          this.nomeInput = data.nome;
          this.telefoneInput = data.telefone;
          this.enderecoInput = enderecoList[0];
          this.cidadeInput = enderecoList[1];
          this.estadoSelect = enderecoList[2];
          this.CEPInput = enderecoList[3];
        },
        error: (err) => {
          console.error('Erro ao buscar usuário', err);
          this.registerEvent.emit({
            success: false,
            message: err.error?.error || `Erro ao buscar usuário: ${err.message}`
          });
        }
      });


    }    
  }

  ngAfterViewInit(): void {
    const forms = document.querySelectorAll<HTMLFormElement>('.needs-validation');
    const btnDelete = document.querySelector<HTMLFormElement>('#btnDelete');
    const btnUpdate = document.querySelector<HTMLFormElement>('#btnUpdate');

    forms.forEach((form) => {
      form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });

    btnDelete?.addEventListener("click", (event) => {
      if(this.userId){
        console.log(this.userId);
        
        this.deleteUser(this.userId).subscribe({
          next: () => {
            this.registerEvent.emit({
              success: true,
              message: 'Usuário excluído com sucesso! Saindo da aplicação...'
            });

            setTimeout(() => {
              this.auth.logout();
            }, 3000);
          },
          error: (err) => {
            this.registerEvent.emit({
              success: false,
              message: err.error?.error || `Erro ao excluir o usuário: ${err.message}`
            });
          }
        });
      }
    });

    addEventListener("submit", (event) => {

      const enderecoCompleto: string[] = [
        this.enderecoInput, this.cidadeInput, this.estadoSelect, this.CEPInput
      ];

      const data = {
        username: this.emailInput,
        password: this.passwordInput,
        role: this.roleRadio,
        nome: this.nomeInput,
        crp: this.crpInput,
        telefone: this.telefoneInput,
        endereco: enderecoCompleto.join(', ')
      }

      if(this.userId) {        
        this.userService.updateUserById(this.userId, data).subscribe({
          next: () => {
            this.registerEvent.emit({
              success: true,
              message: 'Atualização de cadastro realizada com sucesso!'
            });
  
          },
          error: (err) => {
            this.registerEvent.emit({
              success: false,
              message: err.error?.error || `Erro ao atualizar o cadastro do usuário: ${err.message}`
            });
          }
        });
      }

      this.userId = this.auth.getUserId();
      this.userRole = this.auth.getUserRole();
    });
  }

  onChange() {
    this.roleRadio == 'paciente' ? this.isCheckedPsicologo = false : this.isCheckedPsicologo = true;
  }

  getUserFormData(userId: string): Observable<any> {
    return this.userService.getUserById(userId);
  }

  deleteUser(userId: string): Observable<any> {
    return this.userService.deleteUserById(userId);
  }
}
