export const sort = (products: [], sortOrder: string) => {
  if (products) {
    const copy = [...products];
    switch (sortOrder) {
      case "default":
        return copy;
      case "":
        return copy;
      case "a-z":
        return copy.sort((a: any, b: any): number => {
          const nameA: string = a.name.toLowerCase();
          const nameB: string = b.name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          } else return 0;
        });
      case "z-a":
        return copy.sort((a: any, b: any): number => {
          const nameA: string = a.name.toLowerCase();
          const nameB: string = b.name.toLowerCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          } else return 0;
        });
      case "high-low":
        return copy.sort((a: any, b: any): number => {
          const priceA: number = a.retailPrice;
          const priceB: number = b.retailPrice;
          return priceB - priceA;
        });
      case "low-high":
        return copy.sort((a: any, b: any): number => {
          const priceA: number = a.retailPrice;
          const priceB: number = b.retailPrice;
          return priceA - priceB;
        });
      case "latest":
        return copy.sort((a: any, b: any): number => {
          const dateA: any = new Date(a.releaseDate);
          const dateB: any = new Date(b.releaseDate);
          return dateB - dateA;
        });
      case "oldest":
        return copy.sort((a: any, b: any): number => {
          const dateA: any = new Date(a.releaseDate);
          const dateB: any = new Date(b.releaseDate);
          return dateA - dateB;
        });
    }
  }
};
