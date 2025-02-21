import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from './models';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
  
  urgency = "2";
  
  // inject() -> @Autowired
  private fb = inject(FormBuilder)
  
  // form model
  protected form!: FormGroup
  protected collaborators!: FormArray
  
  ngOnInit(): void {
    this.form = this.createform()
  }

  // private is html cannot access whereas protected can be accessed by the html
  private createform(): FormGroup {
    // recreate collaborators array when form is created
    this.collaborators = this.fb.array([])
    return this.fb.group({
      taskName: this.fb.control<string>('',[Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<string>('1'),
      dueDate: this.fb.control<string>('', [Validators.required]),
      urgency: this.fb.control<number>(2),
      comments: this.fb.control<string>(''),
      procrastinate: this.fb.control<boolean>(false),
      collaborators: this.collaborators
    })
  }

  updateUrgency(event: any): void{
    this.urgency = event.target.value
  }

  protected processForm(): void{
    const values: Task = this.form.value
    console.info('>>>>> form: ', values)
  }

  // beacause one ! means not this value but you want the value to be true so add another !
  // double negative is a postive but now can return as a boolean
  // double !! is to evaluate the value as a boolean
  protected isCtrlValid(attr: string): boolean{
    return !!this.form.get(attr)?.valid
  }

  protected isCtrlInvalid(attr: string): boolean{
    return !!this.form.get(attr)?.invalid
  }

  private createCollaborator(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>(''),
      email: this.fb.control<string>('')
    })
  }

  protected addCollaborators() {
    // create collaborator form group
    const col = this.createCollaborator()
    // add to collaborators form array
    this.collaborators.push(col)
  }

  protected removeCollaborator(idx: number) {
    this.collaborators.removeAt(idx)
  }
}
