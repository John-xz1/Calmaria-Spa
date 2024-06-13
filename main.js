let ultimoElementoFocado;

function gerenciarFocoModal(modalId) {
    const modal = document.querySelector(`#${modalId}`);
    const elementosDoModal = modal.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
    const primeiroElemento = elementosDoModal[0];
    const ultimoElemento = elementosDoModal[elementosDoModal.length - 1];
    primeiroElemento.focus();

    modal.addEventListener('keydown', (event) => {
        if(event.key === 'Tab') {
            if(event.shiftKey) {
                //se a tecla Shift+Tab for pressionada , e o foco estiver no primeiro elemento, mover para o ultimo
                if(document.activeElement ===primeiroElemento) {
                    event.preventDefault();
                    ultimoModal.focus();
                }
            } else {
                // se a tecla Tab for pressionada, e o foco estiver no ultimo elemento, mover para o primeiro
                if(document.activeElement === ultimoElemento || !modal.contains(document.activeElement)) {
                    event.preventDefault();
                    primeiroElemento.focus();
                }
            }
        }
    })
}

function alternarModal(modalId, abrir) {
    const modal = document.querySelector(`#${modalId}`);
    if(abrir) {
        modal.style.display = 'block';
        ultimoElementoFocado = document.activeElement;
        gerenciarFocoModal(modalId);
    } else {
        modal.style.display = 'none';
        if(ultimoElementoFocado) {
            ultimoElementoFocado.focus();
        }
    }

    document.body.style.overflow = abrir ? 'hidden' : 'auto';

    const abaEmail = document.querySelector('#inscricao');
    abaEmail.value = '';
}

document.addEventListener('keydown', event => {
    if(event.key === 'Escape') {
        alternarModal('ver-modal-inscrito', false);
        alternarModal('ver-modal-contato', false);

        document.querySelectorAll('.cabecalho__lista-item').forEach(item => {
            alternarSubmenu(item ,false);
        })
    }
})

function alternarSubmenu(item, mostrar) {
    const submenu = item.querySelector('.submenu');

    if(submenu) {
        submenu.style.display = mostrar ? 'block' : 'none';

        const menuItem = item.querySelector('.cabecalho__lista-item a');
        menuItem.setAttribute('aria-expanded', mostrar ? true : false);

        const DropdownExpandedIcon = item.querySelector('.material-symbols-outlined.icone');
        DropdownExpandedIcon.classList.toggle('active', mostrar);
    }
}

// selecionar todos os cabecalho__lista-item
document.querySelectorAll('.cabecalho__lista-item').forEach(item => {
    //adicionar um ouvinte mouseover
    item.addEventListener('mouseover', () => alternarSubmenu(item, true));

    //adicionar um ouvinte mouseout
    item.addEventListener('mouseout', () => alternarSubmenu(item, false));
    
    item.addEventListener('click', () => {
        const submenu = item.querySelector('.submenu');
        const isDisplayed = submenu.style.display === 'block';
        alternarSubmenu(item, !isDisplayed);
    })
});

//codigo para o Acordeao
const botaoAcordeao = document.querySelectorAll('.botao-acordeao');
botaoAcordeao.forEach((button) => {
    button.addEventListener('click', () => alternarAcordeao(button));
});

function alternarAcordeao(button) {
    const isAlreadyOpen = button.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.botao-acordeao').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        const content = btn.nextElementSibling;
        content.classList.remove('expandido');
        content.setAttribute('aria-hidden', 'true');
    });

    if(!isAlreadyOpen) {
        button.setAttribute('aria-expanded', 'true');
        const content = button.nextElementSibling;
        content.classList.add('expandido');
        content.setAttribute('aria-hidden', 'false');
    }
}

// para enviar o modal do formulario
const botaoEnviar = document.querySelector('.btn-enviar');
botaoEnviar.addEventListener('click', () => {
    console.log('salve')
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('mensagem').value = '';
    document.getElementById('ligacao').checked = false;
    document.getElementById('whatsapp').checked = false;
    document.getElementById('email-contato').checked = false;
})