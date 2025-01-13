export interface InputWrapType {
  dataId: string;
  value: string | undefined;
  size: string;
  color: string;
  gap: string;
  holder: string;
  bgColor: string;
  changeValue: (data: string) => void;
}

export interface QuestionWrapType {
  children: React.ReactNode;
}

export interface QuestionType {
  id: number;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  dataId: number;
}

export interface QuestionDetailType {
  dataId: string;
}

export interface OptionType {
  id: number;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  dataId: string;
}

export interface OptionWrapType {
  dataId: string;
}

export interface Option {
  number: number;
  name: string;
}

export interface Question {
  number: number;
  name: string;
  type: string;
  option?: Option[];
  isRequired: boolean;
}

export interface NewPageType {
  survey: {
    title: {
      detail: string;
      text: string;
    };
    titleExplain: {
      detail: string;
      text: string;
    };
    question: Question[];
  };
}
