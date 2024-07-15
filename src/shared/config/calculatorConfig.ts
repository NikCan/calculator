export const calculatorConfig: IButton[] = [
  { value: 'C', title: 'C', action: 'CLEAR' },
  { value: '^0.5', title: '√', action: 'ADD' },
  { value: '%', title: '%', action: 'ADD' },
  { value: '/', title: '/', action: 'ADD' },
  { value: '7', title: '7', action: 'ADD' },
  { value: '8', title: '8', action: 'ADD' },
  { value: '9', title: '9', action: 'ADD' },
  { value: '*', title: 'x', action: 'ADD' },
  { value: '4', title: '4', action: 'ADD' },
  { value: '5', title: '5', action: 'ADD' },
  { value: '6', title: '6', action: 'ADD' },
  { value: '-', title: '-', action: 'ADD' },
  { value: '1', title: '1', action: 'ADD' },
  { value: '2', title: '2', action: 'ADD' },
  { value: '3', title: '3', action: 'ADD' },
  { value: '+', title: '+', action: 'ADD' },
  { value: '*100', title: '00', action: 'ADD' },
  { value: '0', title: '0', action: 'ADD' },
  { value: '.', title: ',', action: 'ADD' },
  { value: '=', title: '=', action: 'CALCULATE' }
];

interface IButton {
  title: string;
  value: string;
  action: ActionType;
}

export type ActionType = 'ADD' | 'CLEAR' | 'CALCULATE';
