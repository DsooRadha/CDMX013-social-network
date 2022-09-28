import {
  savePost, onGetPost, getPost, updatePost, deletePost,
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
  modalPopup.className = 'modalHijo-class';
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
  const postEditSave = document.getElementById('post-description').value;
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
  const inputDescription = document.createElement('textarea');
  inputDescription.id = 'post-description';
  inputDescription.setAttribute('placeholder', 'Escribe algo...');
  const btnPost = document.createElement('button');
  btnPost.id = 'btn-post-save';

  message.textContent = 'Bienvenidx';
  btnPost.innerText = 'Publicar';

  onGetPost((querySnapshot) => {
    divPosts.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const collectionPost = doc.data();
      const allPosts = document.createElement('section');
      allPosts.className = 'containerPost';
      const postContent = document.createElement('p');
      postContent.textContent = collectionPost.post;
      const editBtn = document.createElement('button');
      editBtn.className = 'btn-edit';
      editBtn.data = ('data-id', doc.id);
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn-delete';
      deleteBtn.data = ('data-id', doc.id);
      const likeBtn = document.createElement('button');
      likeBtn.className = 'btn-like';
      likeBtn.data = ('data-id', doc.id);
      likeBtn.textContent = 'like';
      allPosts.append(postContent, likeBtn, editBtn, deleteBtn);
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
    e.preventDefault();
    formHomePage();
    inputDescription.value = '';
    btnPost.innerText = 'Publicar';
  });

  divHomePage.append(
    imgLogo,
    message,
    formHome,
    labelTitle,
    labelDescription,
    inputDescription,
    btnPost,
    divPosts,
  );
  return divHomePage;
};
