export interface InputWrapType {
  dataId: string;
  value: string;
  size: string;
  color:string;
  gap: string;
  holder: string;
  bgColor: string;
}

export interface QuestionWrapType {
  children: React.ReactNode;
}

export interface QuestionType {
  id: number;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

export interface OptionType {
  id: number;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}
