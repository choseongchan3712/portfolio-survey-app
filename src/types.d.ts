export interface InputWrapType {
  dataId: string;
  value: string | undefined;
  size: string;
  color: string;
  gap: string;
  holder: string;
  bgColor: string;
  changeValue: (data: string | null) => void;
  isTextBold: (data: boolean) => void;
  isTextItalic: (data: boolean) => void;
  isTextUnderLine: (data: boolean) => void;
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
  dataSubid: number;
}

export interface OptionWrapType {
  dataId: string;
  questionType: string;
  clicked: boolean;
}

export interface Option {
  number?: number;
  name?: string;
}

export interface Question {
  number: number;
  name: string;
  isItalic: boolean;
  isBold: boolean;
  isUnderLine: boolean;
  type: string;
  option?: Option[];
  isRequired: boolean;
}

export interface NewPageType {
  survey: {
    title: {
      detail: string;
      isItalic: boolean;
      isBold: boolean;
      isUnderLine: boolean;
    };
    titleExplain: {
      detail: string;
      isItalic: boolean;
      isBold: boolean;
      isUnderLine: boolean;
    };
    question: Question[];
  };
}

export interface TextStyleType {
  isBold: boolean;
  isItalic: boolean;
  isUnderLine: boolean;
}