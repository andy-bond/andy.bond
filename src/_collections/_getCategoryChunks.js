const chunk = require('./_chunk');

module.exports = (allItems, pageSize, categories, prefix) => {
  const result = [];

  categories.forEach((category) => {
    const categoryName = category.name;

    const itemsInCategory = allItems.filter((item) => {
      const obj = item.data ? item.data : item;
      return obj.category === categoryName;
    });

    const chunks =
      itemsInCategory?.length > 0 ? chunk(itemsInCategory, pageSize) : [[]];

    const categorySlug = `/${prefix}/${category.folder}/`;
    const slugs = [categorySlug];
    for (let i = 1; i < chunks.length; i++) {
      slugs.push(`${categorySlug}page-${i + 1}/`);
    }

    chunks.forEach((items, index) => {
      result.push({
        name: categoryName,
        slug: slugs[index],
        items: items,
        pageNumber: index,
        hrefs: slugs,
        href: {
          next: slugs[index + 1] || null,
          previous: slugs[index - 1] || null,
          first: slugs[0] || null,
          last: slugs[slugs.length - 1] || null,
        },
        pages: chunks,
        page: {
          next: chunks[index + 1] || null,
          previous: chunks[index - 1] || null,
          first: chunks[0] || null,
          last: chunks[chunks.length - 1] || null,
        },
      });
    });
  });

  return result;
};
