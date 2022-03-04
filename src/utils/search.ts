export const search = (value: string | undefined) => (product: {
  title: string;
}) => value && product?.title.toLowerCase().includes(value.toLowerCase().trim());
  