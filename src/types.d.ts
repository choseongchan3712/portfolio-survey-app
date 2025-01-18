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
  bold: boolean;
  italic: boolean;
  underLine: boolean;
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
  isOther: boolean;
  option?: Option[];
  isRequired: boolean;
}

export interface NewPageType {
  survey: {
    isPost: boolean;
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

export interface PreTitleWrapType {
  title: string;
  explain: string;
  titleType: string;
  explainType: string;
}

export type PreviewTitleType = Pick<NewPageType["survey"]["title"]>;

export type PreviewExplainType = Pick<NewPageType["survey"]["titleExplain"]>;

export interface PreviewQuestion {
  name: string;
  isItalic: boolean;
  isBold: boolean;
  isUnderline: boolean;
  type: string;
  isOther: boolean;
  option?: Option[];
  isRequired: boolean;
  type: string;
  id:number;
}

export interface SavedSurveyType {
  link: string;
  title: string;
  id: number;
}

export interface PostedSurveyType {
  link: string;
  title: string;
}

export interface AnswerType {
  id: number;
  question: string;
  value: string | string[];
}

export interface AnswerSliceType {
  answers: AnswerType[];
}
