/* eslint-disable max-len */
import { savePost, onGetPost, order } from '../lib/auth.js';

const formHomePage = () => {
  const post = document.getElementById('post-description').value;
  savePost(post);
};

export const homepage = () => {
  const divPosts = document.createElement('div');
  divPosts.className = 'div-posts';
  divPosts.id = 'div-View';
  const divHomePage = document.createElement('div');
  divHomePage.className = 'homePage';
  const imgLogo = document.createElement('img');
  imgLogo.src = './img/logo.png';
  imgLogo.setAttribute('id', 'logoImgHome');
  const message = document.createElement('h1');

  const formHome = document.createElement('div');
  formHome.className = 'homePage';
  formHome.id = 'post-form';
  const labelTitle = document.createElement('label');
  labelTitle.className = 'title';
  const labelDescription = document.createElement('label');
  labelDescription.className = 'description';
  const inputDescription = document.createElement('input');
  inputDescription.id = 'post-description';
  inputDescription.setAttribute('placeholder', 'Escribe algo...');
  const btnPost = document.createElement('button');
  btnPost.id = 'btn-post-save';

  message.textContent = 'Bienvenidx';

  btnPost.textContent = 'Publicar';

  btnPost.addEventListener('click', (e) => {
    e.preventDefault();
    formHomePage();
    inputDescription.value = '';
  });

  onGetPost((querySnapshot) => {
    const postView = document.getElementById('div-View');
    
    let html = '';

    querySnapshot.forEach((doc) => {
      const collectionPost = doc.data();
      const div = document.createElement('div');
      const input= document.createElement('input');
    //   html += `
    // <div class = "card border-primary">
    // <p>${collectionPost.post}</p>
    // <button class='btn-edit' data-id='${doc.id}'>Editar</button>
    // </div>
    // `;

     div.textContent='Holaa' 

  postView.append(div, input)
    });
    //postView.innerHTML = html;


     const editPost= postView.querySelectorAll('.btn-edit');
     editPost.forEach(btn=>{
       btn.addEventListener('click', (e)=>{
         console.log(e.target.dataset.id)
       })
     })
   });
 



  divHomePage.append(imgLogo, message, formHome, labelTitle, labelDescription, inputDescription, btnPost, divPosts);
  return divHomePage;
};

