import React, {useEffect, useRef} from 'react';
import {View, Text, Pressable} from 'react-native';
import {WebView} from 'react-native-webview';

export default function IdrafComp() {
  const webView = useRef();
  const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body> 

<button  id="myp" class="btn btn-info"> Issues </button>
 
   


<div style="text-align: justify;" id="detail_page" class="main-detail-content mt-4  mb-5">
                                        Sikri, J.<span id="selectedfacts-1" tabindex="1"><br><br>1. Hari <span class="highNew" style="font-weight:bold;">Ram</span>, respondent, filed a complaint against Lala <span class="highNew" style="font-weight:bold;">Ram</span>, appellant, alleging that Lala <span class="highNew" style="font-weight:bold;">Ram</span>, appellant, alleging that Lala <span class="highNew" style="font-weight:bold;">Ram</span> had attacked him with a Kassi on June 10, 1964, at about 6 p. m. Poonaram, who was standing there prevented the blow from falling on Hari <span class="highNew" style="font-weight:bold;">Ram</span> by receiving it on his hand. The respondent, however, made a second attack and inflicted an injury on the left shoulder of Hari <span class="highNew" style="font-weight:bold;">Ram</span>. Hari <span class="highNew" style="font-weight:bold;">Ram</span> and Poonaram got themselves examined by the Civil Assistant Surgeon of the city and the injury report was submitted along with the complaint.<br><br>2. The learned Magistrate acquitted the accused. Hari <span class="highNew" style="font-weight:bold;">Ram</span> filed an application under Section 417 (3) of the Criminal Procedure Code for leave to appeal against the order of the Magistrate. Leave was granted by the High Court, and thereupon Hari <span class="highNew" style="font-weight:bold;">Ram</span> filed the appeal. The High Court accepted the appeal and convicted the appellant, Lala <span class="highNew" style="font-weight:bold;">Ram</span>, under Section 324, I. P. C., and sentenced him to four months rigorous imprisonment.<br><br>3. The attention of the High Court was not drawn to the Probation of Offenders Act, 1958, during the hearing of the appeal but subsequent to the delivery of the judgment an application was filed under Section 561-A, Cr. P. C., read with Sections 3, 4 and 6 of the Probation of Offenders Act. It was alleged in the application that the appellant was 20 years old and the High Court should have given him the benefit of the Probation of Offenders Act. The High Court did not accede to this application. The appellant having obtained special leave from this Court, the appeal is now before us.</span><span id="selectedissue-1" tabindex="1" style="background-color: rgb(143, 201, 247);"><br><br>4. The main contention of law which arises before us is whether the appeal to the High Court was filed within limitation</span>. <span id="selectedargofpetitioner-1" tabindex="1"><span id="selectedreasoning-1" tabindex="1">The application for leave to appeal to the High Court under Section 417 (3) against the order of acquittal of the Magistrate, dated August 31, 1965, was filed on November 1, 1965. It was claimed by the applicant that two days were necessary for obtaining the certified copy of the order of the Magistrate and the applicant was entitled to deduct these two days taken for obtaining the certified copy of the order of the Magistrate. There is no doubt that the application would be in time if these two days are deducted. But the learned counsel for the appellant contends that Section 12 (2) of the Indian Limitation Act is not attracted to applications under Sec. 417 (3), Cr. P. C. Section 417 (3) and</span></span> (4) read as follows:<blockquote><p>"417. (1) Subject to the provisions of sub-section (5), the State Government may, in any case, direct the Public Prosecutor to present an appeal to the High Court from an original or appellate order of acquittal passed by any Court other than a High Court.<br><br>.... .... .... .... .... .... .... ....<br><br>(3) If such an order of acquittal is passed in any case instituted upon complaint and the High Court, on an application made to it by the complainant in this behalf, grants special leave to appeal from the order of acquittal, the complainant may present such an appeal to the High Court.<br><br>(4) No application under sub-sec. (3) for the grant of special leave to appeal from an order of acquittal shall be entertained by the High Court after the expiry of sixty days from the date of that order of acquittal...."</p></blockquote><br>5. It is contended that the period of 60 days mentioned in Section 417 (4) is not a period of limitation within the meaning of Sec. 12 (2) of the Limitation Act. Section 12 (2) of the Limitation Act reads as follows:<blockquote><p><br>"12 (2). In computing the period of limitation for an appeal or an application for leave to appeal or for revision or for review of a judgment, the day on which the judgment complained of was pronounced and the time requisite for obtaining a copy of the decree, sentence or order appealed from or sought to be revised or reviewed shall be excluded."</p></blockquote><br>6. <span id="selectedargofpetitioner-2" tabindex="1">The learned Counsel says that what Section 417 (4) provides is a prohibition and it bars the jurisdiction of the High Court to deal with the application if a period of 60 days has expired from the date of the order of acquittal.</span><br><br>7. In our opinion there is no force in these contentions. In Kaushalya Rani v. Gopal Singh, (1964) 4 SCR 982 at p. 987 = (AIR 1964 SC 260 at p. 262) this Court, while dealing with the question whether Section 5 of the Limitation Act applies to applications under Section 417 (3) described this period of 60 days mentioned in Section 417 (3) as follows:<blockquote><p>"In that sense, this rule of 60 days bar is a special law, that is to say, a rule of limitation which is specially provided for in the Code itself, which does not ordinarily provide for a period of limitation for appeals or applications."</p></blockquote><br>The Court further observed:<blockquote><p>"Once it is held that the special rule of limitation laid down in sub-section (4) of Section 417 of the Code is a special law of limitation, governing appeals by private prosecutors, there is no difficulty in coming to the conclusion that Sec. 5 of the Limitation Act is wholly out of the way, in view of Section 29 (2) (b) of the Limitation Act."</p></blockquote><br>8. This Court approved the judgment of the Full Bench of the Bombay High Court in Anjanabai v. Yeshwantrao Daulatrao, ILR (1961) Bom 135 at p. 137 = (AIR 1961 Bom 154 at p. 155) (FB). The Full Bench of the Bombay High Court had observed in Anjanabais case, AIR 1961 Bom 154 (FB):<blockquote><p>"Sub-section (4) prescribes a period of limitation for such an application. It states that no such application shall be entertained by the High Court after the expiry of sixty days from the date of the order of acquittal. This period of limitation is prescribed not for all appeals under the Criminal Procedure Code, or even for all appeals from the order of acquittal. It is prescribed only for applications for special leave to appeal from orders of acquittal. It is therefore a special provision for a special subject and is consequently a special law within the meaning of Section 29 (2) of the Limitation Act."</p></blockquote><br>9. <span id="selectedreasoning-2" tabindex="1">It is quite clear that the Full Bench of the Bombay High Court and this Court proceeded on the assumption that Section 417 (4) of the Criminal Procedure Code prescribes a period of</span> limitation. The learned counsel, however, contends that there was no discussion of this aspect. Be <span id="selectedreasoning-3" tabindex="1">that as it may, it seems to us that Section 417 (4) itself prescribes a period of limitation for an application to be made under Section 417 (3).It was not necessary for the legislature to have amended the Limitation Act and to have inserted an article dealing with applications under Section 417 (3), Criminal Procedure Code; it was open to it to prescribe a period of limitation in the Code</span> itself.<br><br>10. <span id="selectedargofpetitioner-3" tabindex="1">The learned counsel also suggests that the word "entertain" which occurs in Section 417 (4) means "to deal with or hear" and in this connection he relies on the judgment of this Court in Lakshmi Rattan Engineering Works v. Asst. Commr., Sales Tax, (1968) 1 SCR 505 = (AIR 1968 SC 488).</span> It <span id="selectedreasoning-4" tabindex="1">seems to us that in this context "entertain" means "file or received by the Court" andit has no reference to the actual hearing of the application for leave to appeal; otherwise the result would be that in many cases applications for leave to appeal would be barred because the applications have not been put up for hearing before the High Court within 60 days of the order of</span> acquittal.<br><br><span id="selecteddecision-1" tabindex="1">11. In the result we hold that the application under Section 417 (3) to the High Court was within time.</span><br><br>12. <span id="selectedargofpetitioner-4" tabindex="1">The learned counsel then contends that the High Court should not have interfered with the order of acquittal passed by the Magistrate. He has taken us through the evidence of Poonaram who was injured and the statement of P. W. 3,Ananda, who was present and who seems to be an independent witness. We agree with the High Court that the Magistrate was not entitled to reject the evidence of the eye-witnesses. No reason has been shown to us why we should interfere with the finding of fact arrived at by the High Court.<br><br>13. The learned counsel further contends that no offence was committed because the accused had a right of private defence of property.</span>Assuming <span id="selectedreasoning-5" tabindex="1">that he had a right of private defence of property he had ample opportunity of having recourse to the authorities and there was no need for the appellant to have taken the law into his own hands.<br><br>14. The only question that remains now is the question whether the benefit of Section 6 of the Probation of Offenders Act should be extended to the appellant. In spite of opportunity being given no good proof has been furnished to establish that the appellant was at the relevant time under the age of 21 years.</span><br><br>15. <span id="selecteddecision-2" tabindex="1">For the aforesaid reasons the appeal fails and is</span> dismissed.<br><br>16. Appeal dismissed.
                  </div>

    


</body> 
</html>
`;

  useEffect(() => {
    const run = `
    document.getElementById('myp').onclick = function changeContent() {  
         location.href = "#selectedissue-1";
        //document.getElementById("#selectedissue-1").scrollIntoView();

     } 
    true;
  `;

    setTimeout(() => {
      webView.current.injectJavaScript(run);
    }, 3000);
  }, []);
  const runFirst = `
      document.body.style.backgroundColor = 'red';
      const myp = document.getElementById("myp")
      myp.innerText ="ramadas"
     
     
      true; // note: this is required, or you'll sometimes get silent failures
    `;
  return (
    <View style={{flex: 1}}> 
      <WebView
        ref={webView}
        source={{html}}
        onMessage={(event) => {
          console.log({event});
        }}
        // injectedJavaScript={runFirst}
      />
    </View>
  );
}
