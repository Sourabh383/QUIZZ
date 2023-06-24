var proceed_button=document.getElementById("proceed");
var box=document.getElementById("box");
var head=document.getElementsByTagName("head");
var name_input=document.main_form.inputName;
var level_input=document.main_form.level;
var subject_input=document.main_form.subject;
var time_check_input=document.getElementById("time_check");
var name,level,subject,time_check,bar,width,id,quizOver=0,score=0,submit_button;
var list,current,choices,answer_box,len,next_elem,clear_elem,total;
const num_choices=4;
function loadQuiz(sub,difficulty){
  if((sub==="General Knowledge")&&(difficulty==="medium")){
    list=[
      {
          question: "A A computer cannot boot if it does not have the",
          choices: ["Compiller", "Opating System","Loader","None of these"],
          correct: 2,
          desc: "An operating system is the system software that handles the software and hardware resources and provides services for the computer programs",
          image: "./images/bootpc.jpg"
      },
      {
          question: "Who has there trophy cabinet empty in ipl?",
          choices: ["Royal Challengers Banglore", "Chennai Super Kings","Sunrisers Hyderabad","Kolkata Knight Riders"],
          correct: 1,
          desc: "Royal challengers bangalore are yet to win there first ipl trophy.",
          image: "None"    
      },
      {
          question: "Where is statue of Ahinsa located?",
          choices: ["Mysooree", "Patna","Nashik","Thiruvananthapuram"],
          correct: 3,
          desc: "The Statue of Ahimsa (121 feet tall), depicts the first Jain Tirthankara, Rishabhanatha, is located at Mangi-Tungi, near Nashik in the Indian state of Maharashtra.",
          image: "./images/statue.jpg"    
      },
      {
          question: "Which of the following is called 'City of Lakes' ?",
          choices: ["New Delhi", "Mount Abu","Nainital","Udaipur"],
          correct: 4,
          desc: "Set around a series of artificial lakes, Udaipur is also known for its lavish royal residences",
          image: "None"    
      },
      {
          question: "Which is the first smart city in world?",
          choices: ["New Jersey", "Seoul","Vatican City","California"],
          correct: 2,
          desc: "Seoul has been immersed in smart technology for years, having been named the world's first smart city back in 2014.",
          image: "./images/seoul.jpg"    
      }
      ];
  }
  else if((sub==="General Knowledge")&&(difficulty==="easy")){
    list=[
      {
          question: "WHo is father of Computer",
          choices: ["Charles Babbage", "Alan Turing","Charles Lee","Kerning"],
          correct: 1,
          desc: "Common Fact",
          image: "None"
      },
      {
          question: "Which team won the IPL in 2019?",
          choices: ["Mumbai Indians", "Chennai Super Kings","Sunrisers Hyderabad","Kolkata Knight Riders"],
          correct: 1,
          desc: "Mumbai Indians won IPL in 2019, defeating Chennai Super Kings in the finals.",
          image: "./images/trophy.jpg"    
   
      },
      {
          question: "Which is the tallest waterfalls in the world ?",
          choices: ["Jog Falls", "Tugela Falls","Angel Falls","Victoria Falls"],
          correct: 3,
          desc: " Angel Falls (Salto Ángel) in Venezuela is the highest waterfall in the world. The falls are 3230 feet in height.",
          image: "./images/fall.jpg"    
      },
      {
          question: "Which of the following statements is not correct about the 'Statue of Unity'?",
          choices: ["'Statue of Unity' is located in Narmada district of Gujarat", "Its height is equal to the Statue of Liberty","The Statue of Unity was dedicated to the nation on 31 October 2018","The height of the Statue of Unity is about 182 meters (597 ft)."],
          correct: 2,
          desc: "The Statue of Unity is located in the Narmada district of Gujarat and is the tallest statue in the world that was dedicated to the nation on 31 October 2018. The Statue of Unity has a height of 182 meters (597 ft), while the height of 'Statue of Liberty' is just 93 meters.",
          image: "./images/statueofunity.jpg"   
      },
      {
          question: "Which is the southernmost point of India?",
          choices: ["Siachin", "Indira Point","Thiruvananthapuram","Kanyakumari"],
          correct: 2,
          desc: "The southernmost point of the Indian territory is Indira Point in the Andaman & Nicobar Islands. It's Cape Comorin or Kanyakumari that is the southernmost point in mainland India.",
          image: "None"    
      }
      ];
  }
}

function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function result() {
    clearInterval(id);
    save();
    check();
    if(score>total) score=total;
    if(quizOver===1){
      alert("\tYour quiz is already over."); 
    }
    quizOver=1;
    if(score<(total/2)){
      alert("\t \tSorry " +name+", you could only score  "+score+ " / " +total+"\n\tBetter Luck next time.."); 
    }
    else{
      alert("\t \tCongrats " +name+", you have scored  "+score+ " / " +total); 
    }
    renderQuestion(current);
}

function frame() {
    if (width >= 100) {
      clearInterval(id);
      check();
      quizOver=1;
      if(score<(total/2)){
        alert("\t \t Time Over!!\nSorry " +name+", you could only score  "+score+ " / " +total+"\nBetter Luck next time.."); 
      }
      else{
        alert("\t \t Time Over!!\nCongrats " +name+", you have scored  "+score+ " / " +total); 
      }
       
    } else {
      width++;
      bar.innerHTML=(100-width)+" secs left";
      bar.style.width = width + '%';
    }
  }

  function renderQuestion(i){
  current=i;
  document.getElementById("question").innerHTML=(i+1)+'. '+list[i].question;
  let flag=0;
  for(let j=0; j<num_choices; j++)
  {
    document.getElementById("lab"+j).innerHTML=(list[i].choices)[j];
    if(choices[i]==(j+1))
    {
      document.getElementById("op"+(j)).checked=true;
      flag=1;
    }
    else if(quizOver===1){
      document.getElementById("op"+(j)).disabled=true;
    }
    if(quizOver===1){
        if((choices[i]===(list[i].correct))&&((j+1)===(list[i].correct)))
        {
        document.getElementById("lab"+j).innerHTML+='<i class="fa fa-check text-success" aria-hidden="true"></i>';
        }
        else if((choices[i]!==(list[i].correct)))
        {
         if((choices[i]!==0))
         {
          if(((j+1)===choices[i]))
          {
          document.getElementById("lab"+j).innerHTML+='<i class="fa fa-times text-danger" aria-hidden="true"></i>';
          }
          else if((j+1)===list[i].correct)
          {
          document.getElementById("lab"+j).innerHTML+='<i class="fa fa-check text-success" aria-hidden="true"></i>';
          }
         }
        else if((j+1)===(list[i].correct)){
          document.getElementById("lab"+j).innerHTML+='<i class="fa fa-check text-info" aria-hidden="true"></i>';
        }
        }
        document.querySelector('.alert').innerHTML=list[i].desc;
    } 
  }
  if(flag==0)
  {
      clear();
  }
  if(list[i].image!=="None"){
    document.querySelector(".quest-img").setAttribute('src',list[i].image);
  }
  else{
    document.querySelector(".quest-img").setAttribute('src',"");
  }
  }
  
  function save(){
    let selected=0,flag=0;
    if(quizOver==0){
    for(let i=0; i<num_choices; i++){
      if(document.getElementById("op"+(i)).checked==true){
        choices[current]=i+1;
        flag=1;
        break;
      }
    }
    if(flag==0){
      choices[current]=0;
    }
  }
  }

  function next(){
    // Save the choice and move to next
    save();
    if(current<(len-1))
    {
      current++;
      renderQuestion(current);
    }
    else{
      alert("This was the last question of the quiz.");
    }    
  }

  function clear(){
    for(let i=0; i<num_choices; i++){
      if(document.getElementById("op"+(i)).checked==true){
        document.getElementById("op"+(i)).checked=false;
        break;
      }
    }
  }
  

  function check(){
    if(quizOver===0){

    for(let i=0; i<len; i++){
      if(choices[i]===(list[i].correct)){
        score+=5;
      }
      else if(choices[i]!=0){
        score-=2;
      }
    }
    }
  }

function submit(){
    name=name_input.value.trim();
    level=level_input.value;
    subject=subject_input.value;
    time_check=time_check_input.checked;

  if(name!=null&&name!="") 
    {
    loadQuiz(subject,level);
    alert('Welcome '+name+" !!\nGet ready for the quiz... \nDon't try to reload the page during the quiz\
 otherwise, it may result in loss of data \n\t\tRules:-\n\t(+5) for correct answer\n\t(-2) for wrong answer");
   
  if(time_check==true)
    {
    box.innerHTML="<div class=\"boundary\"><h4 align=\"center\"> Timer</h4><div class=\"progress\"> <div class=\"progress-bar progress-bar-striped\" role=\"progressbar\" style=\"width: 0%\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" id=\"bar\"></div> </div><br></div>"+box.innerHTML;
    bar=document.getElementById("bar");
    width=0;
    id=setInterval(frame, 1000);
    }
else{
    
    }
    removeElement("main_form");
    let body=document.querySelector('.card-body');
    document.querySelector('.card-header').innerHTML=subject+" Quiz - ("+level+")";
    body.classList.add('text-center');
    body.innerHTML='<div class="btn-group mr-2" id="Scroll" role="group" aria-label="Scroll"></div>';
    body.innerHTML+='<br><br><div class="row text-center"><img class="rounded quest-img mx-auto d-block"></div>';
    body.innerHTML+='<br><p align="center" id="question"></p>';
    for(i=0; i<num_choices; i++)
    {
      body.innerHTML+='<div class="form-check"><input class="form-check-input" type="radio" name="option" id="op'+i+ '"value="op'+i+'"><label class="form-check-label" for="op'+i+'" id="lab'+i+'"></label></div>';
    }
    body.innerHTML+='<br><div class="alert alert-info" role="alert">Best of Luck</div><br><div class="row justify-content-center"><button id="clear" class="btn btn-danger">Clear Response</button>&nbsp;&nbsp;<button id="next" class="btn btn-primary">Save & Next</button>&nbsp;&nbsp;<button type="submit" id="done" class="btn btn-primary">Submit</button></div>';
    next_elem=document.getElementById("next");
    clear_elem=document.getElementById("clear");
    submit_button=document.getElementById("done");
    submit_button.addEventListener('click',result);
    next_elem.addEventListener('click',next);
    clear_elem.addEventListener('click',clear);
    len=list.length;
    total=len*5;
    choices=new Array(len);
    for(let i=0; i<len; i++){
        addElement("Scroll","button","quest"+i,String(i+1));
        let elem=document.getElementById('quest'+i);
        elem.setAttribute('type','button');
        elem.setAttribute('class','btn btn-warning');
        elem.addEventListener('click',()=>{current=i; renderQuestion(i)});
        choices[i]=0;
    }
    renderQuestion(0);
    }

  }
proceed_button.addEventListener("click",submit);
