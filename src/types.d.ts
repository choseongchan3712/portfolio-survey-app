export interface InputWrapType {
  dataId: string;
  value: string | undefined;
  size: string;
  color: string;
  gap: string;
  holder: string;
  bgColor: string;
  changeValue: (data: string|null) => void;
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
  clicked: boolean;
}

export interface OptionType {
  id: number;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  dataId: string;
  questionType: string;
}

export interface OptionWrapType {
  dataId: string;
  questionType: string;
  clicked: boolean;
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
