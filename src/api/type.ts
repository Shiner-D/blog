export interface Resume {
  basic: Array<string>;
  skills: string[];
  hobbies: string[];
  experience: Array<string>;
  contacts: string[];
}

export interface User {
  author: string;
  hobby: string;
  job: string;
  signature: string;
}

export interface Articles {
  title: string;
  description: string;
  link: string;
}

export interface ArticlesResponse {
  list: Articles[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
}
