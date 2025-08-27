// script.js
document.addEventListener('DOMContentLoaded', function () {
    const menuMobile = document.querySelector('.menu-mobile');
    const navUl = document.querySelector('nav ul');

    // Menu mobile
    if (menuMobile) {
        menuMobile.addEventListener('click', function () {
            navUl.classList.toggle('show');
        });
    }

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navUl.classList.remove('show');
            }
        });
    });

    // Filtros da loja
    if (document.querySelector('.loja')) {
        const categoriaSelect = document.getElementById('categoria');
        const marcaSelect = document.getElementById('marca');
        const searchInput = document.getElementById('myInput');
        const produtos = document.querySelectorAll('.produto');

        function filtrarProdutos() {
            const categoria = categoriaSelect ? categoriaSelect.value : 'todos';
            const marca = marcaSelect ? marcaSelect.value : 'todos';
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

            produtos.forEach(produto => {
                const prodCategoria = produto.dataset.categoria;
                const prodMarca = produto.dataset.marca;
                const prodName = produto.querySelector('h3').textContent.toLowerCase();
                const prodDesc = produto.querySelector('p').textContent.toLowerCase();

                const categoriaMatch = categoria === 'todos' || prodCategoria === categoria;
                const marcaMatch = marca === 'todos' || prodMarca === marca;
                const searchMatch = searchTerm === '' ||
                    prodName.includes(searchTerm) ||
                    prodDesc.includes(searchTerm);

                if (categoriaMatch && marcaMatch && searchMatch) {
                    produto.style.display = 'block';
                } else {
                    produto.style.display = 'none';
                }
            });
        }

        // Adicionar event listeners para os filtros
        if (categoriaSelect) {
            categoriaSelect.addEventListener('change', filtrarProdutos);
        }
        
        if (marcaSelect) {
            marcaSelect.addEventListener('change', filtrarProdutos);
        }
        
        if (searchInput) {
            searchInput.addEventListener('keyup', filtrarProdutos);
        }
    }

    // Formulário de contato
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }

    // Formulário de newsletter
    const formNewsletter = document.getElementById('form-newsletter');
    if (formNewsletter) {
        formNewsletter.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Obrigado por assinar nossa newsletter! Um e-mail foi enviado para ${email}`);
            this.reset();
        });
    }

    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});