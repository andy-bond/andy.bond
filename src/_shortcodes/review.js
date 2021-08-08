module.exports = (item) => {
  return `<div class="review-item" data-type="${item.data.type}">
  <img src="${item.data.page.url}${item.data.image}" loading="lazy">
  <div class="info">
    <h1>${item.data.title}</h1>
    ${item.data.subtitle ? `<p class="subtitle">${item.data.subtitle}</p>` : ''}
    <p class="rating">${Array(5).fill('☆').fill('★', 0, item.data.rating).join('')}</p>
    <a href="${item.url}">Read Review →</a>
  </div>
</div>`;
}
