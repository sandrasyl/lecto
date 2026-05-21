const input = document.getElementById('searchInput');
const results = document.getElementById('searchResults');
const resultsCount = document.getElementById('resultsCount');

async function searchBooks(query) {
  if (!query.trim()) {
    results.innerHTML = '';
    resultsCount.textContent = '';
    return;
  }

  const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
  const data = await response.json();
  const books = data.docs.slice(0, 8);

  results.innerHTML = '';
  resultsCount.textContent = `${books.length} resultados`;

  books.forEach(book => {
    const cover = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : 'https://via.placeholder.com/200x300?text=Sin+portada';

    const card = document.createElement('div');
    card.classList.add('book-card');

    card.innerHTML = `
      <img src="${cover}">
      <h4>${book.title}</h4>
      <p>${book.author_name?.[0] || 'Autor desconocido'}</p>
    `;

    results.appendChild(card);
  });
}

input.addEventListener('input', (e) => {
  searchBooks(e.target.value);
});
