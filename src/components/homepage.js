import {
  savePost, onGetPost, getPost, updatePost, deletePost, likesPost, dislikesPost,
  emailUser, singOutSession,
} from '../lib/auth.js';

let editStatus = false;
let id = '';

const closeModal = () => {
  const divPosts = document.getElementById('div-View');
  const modalContainer = document.getElementById('modal-content');
  divPosts.removeChild(modalContainer);
};
const modalDelete = (item) => {
  const divPosts = document.getElementById('div-View');
  const modalContainer = document.createElement('section');
  modalContainer.className = 'modal-class';
  modalContainer.id = 'modal-content';
  const modalPopup = document.createElement('section');
  modalPopup.className = 'modalPopup-class';
  modalPopup.id = 'modalHijo-content';
  const textModal = document.createElement('h3');
  const cancelbtn = document.createElement('button');
  cancelbtn.className = 'btnCancel';
  const okbtn = document.createElement('button');
  okbtn.className = 'btnok';
  okbtn.textContent = 'Eliminar';
  okbtn.data = (item);
  cancelbtn.textContent = 'Cancelar';

  textModal.textContent = '¿Deseas eliminar este Post?';
  okbtn.addEventListener('click', ({ target: { data } }) => {
    deletePost(data);
  });

  cancelbtn.addEventListener('click', closeModal);
  modalPopup.append(textModal, cancelbtn, okbtn);
  divPosts.appendChild(modalContainer);
  modalContainer.appendChild(modalPopup);
};

const formHomePage = () => {
  const postEditSave = document.getElementById('post-description').alue;
  if (!editStatus) {
    savePost(postEditSave);
  } else {
    updatePost(id, { post: postEditSave });
    editStatus = false;
  }
};

export const homepage = () => {
  const divPosts = document.createElement('div');
  divPosts.className = 'div-posts';
  divPosts.id = 'div-View';
  const topsection = document.createElement('section');
  topsection.className = 'topSection';
  const imgLogo = document.createElement('img');
  imgLogo.src = './img/logo.png';
  imgLogo.setAttribute('id', 'logoImgHome');
  const btnCloseSession = document.createElement('button');
  btnCloseSession.textContent = 'SALIR';
  btnCloseSession.className = 'closeSession';
  const divHomePage = document.createElement('div');
  divHomePage.className = 'homePage';
  const message = document.createElement('h1');
  message.textContent = `¡Bienvenidx, ${emailUser}!`;
  const formHome = document.createElement('div');
  formHome.className = 'homePage';
  formHome.id = 'post-form';
  const labelTitle = document.createElement('label');
  labelTitle.className = 'title';
  const labelDescription = document.createElement('label');
  labelDescription.className = 'description';
  const inputDescription = document.createElement('textarea');
  inputDescription.setAttribute('rows', 4);
  inputDescription.setAttribute('maxlength', 100);
  inputDescription.id = 'post-description';
  inputDescription.setAttribute('placeholder', 'Escribe algo...');
  const btnPost = document.createElement('button');
  btnPost.id = 'btn-post-save';
  const messageErrorPost = document.createElement('p');
  messageErrorPost.className = 'messageError';

  btnPost.innerText = 'Publicar';
  const containerBtnPosts = document.createElement('section');
  containerBtnPosts.className = 'containerBtnPosts';

  btnCloseSession.addEventListener('click', () => {
    singOutSession();
  });

  onGetPost((querySnapshot) => {
    divPosts.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const collectionPost = doc.data();
      const user = collectionPost.userEmail;
      const showEmail = document.createElement('p');
      showEmail.textContent = user;
      showEmail.className = 'showEmail';
      const allPosts = document.createElement('section');
      allPosts.className = 'containerPost';
      const postContent = document.createElement('p');
      postContent.textContent = collectionPost.post;
      postContent.className = 'textInPost';
      const likeBtn = document.createElement('button');
      likeBtn.className = 'btn-like';
      likeBtn.data = ('data-id', doc.id);
      likeBtn.textContent = collectionPost.likes.length;
      const emailString = emailUser.toString();

      if (user === emailString) {
        const editAndDeletePosts = document.createElement('section');
        editAndDeletePosts.className = 'editAndDeletePosts';
        const editBtn = document.createElement('button');
        editBtn.className = 'btn-edit';
        editBtn.data = ('data-id', doc.id);
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.data = ('data-id', doc.id);
        editAndDeletePosts.append(editBtn, deleteBtn);
        allPosts.append(editAndDeletePosts);
      }

      likeBtn.addEventListener('click', async (e) => {
        if (collectionPost.likes.includes(emailString)) {
          await dislikesPost(e.target.data);
        } else {
          await likesPost(e.target.data);
        }
      });

      allPosts.append(showEmail, postContent, likeBtn);
      divPosts.append(allPosts);
    });

    const editPost = divPosts.querySelectorAll('.btn-edit');
    editPost.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const postId = await getPost(e.target.data);
        const postInfo = postId.data();
        inputDescription.value = postInfo.post;
        editStatus = true;
        id = postId.id;
        btnPost.innerText = 'Guardar';
        topsection.scrollIntoView(true);
      });
    });

    const btnsDelete = divPosts.querySelectorAll('.btn-delete');
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        (modalDelete(e.target.data));
      });
    });
  });

  btnPost.addEventListener('click', (e) => {
    if (inputDescription.value === '') {
      messageErrorPost.innerText = 'No se puede hacer una publicación vacía';
    } else {
      e.preventDefault();
      formHomePage();
      inputDescription.value = '';
      btnPost.innerText = 'Publicar';
      messageErrorPost.innerText = '';
    }
  });

  const editPost = divPosts.querySelectorAll('.btn-edit');
  editPost.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const postId = await getPost(e.target.data);
      const postInfo = postId.data();
      inputDescription.value = postInfo.post;
      editStatus = true;
      id = postId.id;
      btnPost.innerText = 'Guardar';
    });
  });
  topsection.append(imgLogo, btnCloseSession);
  divHomePage.append(
    topsection,
    message,
    formHome,
    labelTitle,
    labelDescription,
    inputDescription,
    btnPost,
    messageErrorPost,
    divPosts,
  );
  return divHomePage;
};
