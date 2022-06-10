import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  formData: FormGroup;
  isSubmitted = false;
  textBlock: string;
  msgbody: string;
  msg: string;

  constructor(private builder: FormBuilder, private emailComposer: EmailComposer, private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.formData = this.builder.group({
      Fullname: new FormControl('', [Validators.required,
        Validators.minLength(3),Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*'),]),
      Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      Comment: new FormControl('', [Validators.required])
    })

    this.msg="Prueba la App eCarta, para más información visita en www.oscartm.com";
  }

  get errorControl() {
    return this.formData.controls;
  }

  sendEmail(){
     window.open('', '_system');
     this.textBlock = "<p>Here is a link <a href='mailto:oscar.trujillo1985@gmail.com'>https://google.com</a></p>";
  }

  onSubmit() {
    if (!this.formData.valid) {
      this.isSubmitted = false;
      console.log('Faltan valores!' + this.formData.value)
      return false;
    } else {
      this.isSubmitted = true;
      this.msgbody=
        "Nombre: "+ this.formData.controls.Fullname.value + ". " +
        "Email: "+ this.formData.controls.Email.value + ". " +
        "Comentario: "+ this.formData.controls.Comment.value;

      this.socialSharing.shareViaEmail(this.msgbody, 'Restaurant App Feedback', ['oscar.trujillo1985@gmail.com'])
    }
  }

  ShareWhatsapp(){
    this.socialSharing.shareViaWhatsApp(this.msg)
  }

  ShareFacebook(){
    this.socialSharing.shareViaFacebookWithPasteMessageHint(this.msg)
  }

  SendTwitter(){
    this.socialSharing.shareViaTwitter(this.msg)
  }


}
