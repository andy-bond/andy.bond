const lodash = require("lodash");

module.exports = (allItems, pageSize, categoryNames, prefix) => {
  const result = [];

  categoryNames.forEach((category) => {
    const itemsInCategory = allItems.filter((item) => {
      const obj = item.data ? item.data : item;
      return obj.category === category;
    });

    const chunks = itemsInCategory && itemsInCategory.length > 0 ? lodash.chunk(itemsInCategory, pageSize) : [[]];

    const categorySlug = `/${prefix}/category/${category}/`;
    const slugs = [categorySlug];
    for (let i = 1; i < chunks.length; i++) {
      slugs.push(`${categorySlug}page-${i + 1}/`);
    }

    chunks.forEach((items, index) => {
      result.push({
        name: category,
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
}
