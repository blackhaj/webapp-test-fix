export type WishListBook = {
  title: string;
  asin: string;
  author: string;
  imageUrl: string;
  wishlistDate: number;
  status: 'Wishlist';
};

export type KindleBook = {
  title: string;
  asin: string;
  author: string;
  imageUrl: string;
  purchaseDate: number;
  status: 'Not started' | 'Finished' | 'Ditched' | 'Wishlist';
};

export type AmazonBook = WishListBook | KindleBook;
