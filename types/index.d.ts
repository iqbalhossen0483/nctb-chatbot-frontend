export interface ApiResponse {
  answer: string;
  reference: {
    book: string;
    chapter: string;
    page?: string;
  };
}
