export const homepage = () => {
  const divHomePage = document.createElement('div');
  divHomePage.className = 'homePage';
  const imgLogo = document.createElement('img');
  imgLogo.src = './img/logo.png';
  imgLogo.setAttribute('id', 'logoImgHome');
  const message = document.createElement('h1');

  const formHome= document.createElement('div');
  formHome.className = 'homePage';
  formHome.id='task-form'
  const labelTitle = document.createElement('label');
  labelTitle.className = 'title';
  const inputTitle = document.createElement('input');
  inputTitle.setAttribute('type', 'texto');
  inputTitle.setAttribute('placeholder', 'Task Title');
  inputTitle.id = 'task-title';
  const labelDescription = document.createElement('label');
  labelDescription.className = 'description';
  const inputDescription = document.createElement('textarea');
  inputDescription.id = 'task description';
  inputDescription.setAttribute('rows', '3');
  inputDescription.setAttribute('placeholder', 'Task Description');
  const btnSave = document.createElement('button');
  btnSave.id='btn-task-save';

  message.textContent = 'En Construcción...';

  labelTitle.textContent = 'Title';
  labelDescription.textContent = 'Description';
  btnSave.textContent = 'Save';

  btnSave.addEventListener('click', formHomePage)

  divHomePage.append(imgLogo, message,  formHome, labelTitle, inputTitle, labelDescription, inputDescription,btnSave);
  return divHomePage;
};

 const formHomePage = (e) => {
   e.preventDefault();
   const title =document.getElementById('task-title').value
   const description =document.getElementById('task description').value

 }