module.exports = {
  ...require('eslint-config-mantine/.prettierrc.js'),
  importOrder: ['^react$', '^next(.*)$', "^@supabase/(.*)$", "^@mantine/(.*)$",  '^[^.]', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
