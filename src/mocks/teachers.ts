export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
}

export const teachers: Teacher[] = [
  { id: 1, firstName: "Иван", lastName: "Иванов", patronymic: "Иванович" },
  { id: 2, firstName: "Петр", lastName: "Петров", patronymic: "Петрович" },
  { id: 3, firstName: "Сидор", lastName: "Сидоров", patronymic: "Сидорович" },
  { id: 4, firstName: "Анна", lastName: "Аннова", patronymic: "Анновна" },
  { id: 5, firstName: "Елена", lastName: "Еленова", patronymic: "Еленовна" },
];
