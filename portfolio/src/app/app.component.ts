import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';
import Typed from 'typed.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
  contactUsForm!: FormGroup;

  constructor(private fb: FormBuilder, private toaster: ToastrService){

  }

  ngOnInit(){
    this.contactUsForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      msg: ['', [Validators.required]]
    })
  }
  
  ngAfterViewInit(){
    this.startTypingEffect()

  }


  sendEmail(){
    console.log(this.contactUsForm);
    if(this.contactUsForm.invalid){
      this.contactUsForm.markAllAsTouched();
    }else{
      emailjs.init('wngNXdrFevTVPM5GC');
      emailjs.send("service_s4y2okb","template_mvkrx3b",{
        from_name: this.contactUsForm.get('name')?.value,
        to_name: "Kapil",
        email: this.contactUsForm.get('email')?.value,
        subject: this.contactUsForm.get('subject')?.value,
        message: this.contactUsForm.get('msg')?.value,
      });
      this.showToast()
    }
  }

  downloadResume(){
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf';
    link.download = 'Kapil_Ingle_Resume.pdf';
    link.click();
  }

  showToast() {
    this.toaster.success('Your message has been sent.', 'Thanks', {
      positionClass: 'toast-top-right', // specific position for this toast
      timeOut: 3000
    });
  }

  startTypingEffect(){
    if(typeof document !== 'undefined'){
      const options = {
      strings: ["Angular Developer", "Frontend Developer", "Software Engineer"],
      typeSpeed: 100,         // Typing speed in milliseconds
      backSpeed: 50,          // Backspacing speed
      backDelay: 1500,        // Time before backspacing starts
      loop: true              // Loop the typing effect
    };
    const typed = new Typed('.typed-element', options);
    }
  }

  // End
}
