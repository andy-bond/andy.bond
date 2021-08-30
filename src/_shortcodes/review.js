module.exports = (item) => {
  const category = item.data.categories.reviews.find(i => i.name === item.data.category);
  const capitalized = `${category.name[0].toUpperCase()}${category.name.slice(1)}`;
  return `<div class="review-item">
  <img src="${item.data.page.url}${item.data.image}" loading="lazy">
  <div class="info">
    <h1>${item.data.title}</h1>
    ${item.data.subtitle ? `<p class="subtitle">${item.data.subtitle}</p>` : ''}
    <p class="rating">${item.data.rating} / 10</p>
    <a href="${item.url}">Read Review →</a>
  </div>
  <div class="category">
    ${category.icon} ${capitalized}
  </div>
</div>`;
}
